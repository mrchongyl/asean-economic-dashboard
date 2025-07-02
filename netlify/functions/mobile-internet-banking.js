exports.handler = async (event) => {
  const country = (event.queryStringParameters && event.queryStringParameters.country || 'MYS').toUpperCase();
  const start_year = event.queryStringParameters && event.queryStringParameters.from || '1960';
  const end_year = event.queryStringParameters && event.queryStringParameters.to || '2024';

  const url = `https://data360api.worldbank.org/data360/data?DATABASE_ID=IMF_FAS&INDICATOR=IMF_FAS_FCMIBT&REF_AREA=${country}&timePeriodFrom=${start_year}&timePeriodTo=${end_year}&skip=0`;

  try {
    const response = await fetch(url);
    const wb_data = await response.json();
    
    // Extract raw data array first (match Python logic)
    let rawData = [];
    if (wb_data && typeof wb_data === 'object' && 'data' in wb_data && Array.isArray(wb_data.data)) {
      rawData = wb_data.data;
    } else if (wb_data && typeof wb_data === 'object' && 'value' in wb_data) {
      rawData = wb_data.value;
    }
    
    // Filter and format data (match frontend expectations)
    const filteredData = rawData
      .filter(item => item.OBS_VALUE !== null && item.OBS_VALUE !== undefined && !isNaN(Number(item.OBS_VALUE)))
      .map(item => ({
        year: item.TIME_PERIOD,
        value: parseFloat(item.OBS_VALUE),
        unit: item.UNIT_MEASURE
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: filteredData }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `API request failed: ${e.message}` }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }
};
