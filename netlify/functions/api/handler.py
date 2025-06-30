import json
import requests
from urllib.parse import parse_qs, urlparse

ASEAN_COUNTRIES = ["BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "VNM"]

def handler(event, context):
    # Get the path from the event
    path = event.get('path', '')
    method = event.get('httpMethod', 'GET')
    
    # Parse query parameters
    query_params = event.get('queryStringParameters') or {}
    
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    }
    
    # Handle preflight requests
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        if '/gdp-per-capita' in path:
            return handle_gdp_per_capita(query_params, headers)
        elif '/credit-card-usage' in path:
            return handle_credit_card_usage(query_params, headers)
        elif '/inflation' in path:
            return handle_inflation(query_params, headers)
        elif '/cpi' in path:
            return handle_cpi(query_params, headers)
        elif '/mobile-internet-banking' in path:
            return handle_mobile_internet_banking(query_params, headers)
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({"error": "Endpoint not found"})
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"error": f"Internal server error: {str(e)}"})
        }

def handle_gdp_per_capita(query_params, headers):
    try:
        start_year = query_params.get('from', '1960')
        end_year = query_params.get('to', '2023')
        country = query_params.get('country', 'MYS').upper()
        
        url = "https://data360api.worldbank.org/data360/data"
        params = {
            'DATABASE_ID': 'WB_WDI',
            'INDICATOR': 'WB_WDI_NY_GDP_PCAP_CD',
            'REF_AREA': country,
            'timePeriodFrom': start_year,
            'timePeriodTo': end_year,
            'skip': 0
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        wb_data = response.json()
        
        if isinstance(wb_data, dict) and 'data' in wb_data:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data['data']})
            }
        else:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data})
            }
    except requests.exceptions.RequestException as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"error": f"API request failed: {str(e)}"})
        }

def handle_credit_card_usage(query_params, headers):
    try:
        start_year = query_params.get('from', '1960')
        end_year = query_params.get('to', '2023')
        country = query_params.get('country', 'MYS').upper()
        
        url = "https://data360api.worldbank.org/data360/data"
        params = {
            'DATABASE_ID': 'IMF_FAS',
            'INDICATOR': 'IMF_FAS_FCCCC',
            'REF_AREA': country,
            'timePeriodFrom': start_year,
            'timePeriodTo': end_year,
            'skip': 0
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        wb_data = response.json()
        
        if isinstance(wb_data, dict) and 'data' in wb_data and isinstance(wb_data['data'], list):
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data['data']})
            }
        elif isinstance(wb_data, dict) and 'value' in wb_data:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data['value']})
            }
        else:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': []})
            }
    except requests.exceptions.RequestException as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"error": f"API request failed: {str(e)}"})
        }

def handle_inflation(query_params, headers):
    try:
        start_year = query_params.get('from', '1960')
        end_year = query_params.get('to', '2023')
        country = query_params.get('country', 'MYS').upper()
        
        url = "https://data360api.worldbank.org/data360/data"
        params = {
            'DATABASE_ID': 'WB_WDI',
            'INDICATOR': 'WB_WDI_FP_CPI_TOTL_ZG',
            'REF_AREA': country,
            'timePeriodFrom': start_year,
            'timePeriodTo': end_year,
            'skip': 0
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        wb_data = response.json()
        
        if isinstance(wb_data, dict) and 'data' in wb_data:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data['data']})
            }
        else:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data})
            }
    except requests.exceptions.RequestException as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"error": f"API request failed: {str(e)}"})
        }

def handle_cpi(query_params, headers):
    try:
        start_year = query_params.get('from', '1960')
        end_year = query_params.get('to', '2023')
        country = query_params.get('country', 'MYS').upper()
        
        url = "https://data360api.worldbank.org/data360/data"
        params = {
            'DATABASE_ID': 'WB_WDI',
            'INDICATOR': 'WB_WDI_FP_CPI_TOTL',
            'REF_AREA': country,
            'timePeriodFrom': start_year,
            'timePeriodTo': end_year,
            'skip': 0
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        wb_data = response.json()
        
        if isinstance(wb_data, dict) and 'data' in wb_data:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data['data']})
            }
        else:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data})
            }
    except requests.exceptions.RequestException as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"error": f"API request failed: {str(e)}"})
        }

def handle_mobile_internet_banking(query_params, headers):
    try:
        start_year = query_params.get('from', '1960')
        end_year = query_params.get('to', '2024')
        country = query_params.get('country', 'MYS').upper()
        
        url = "https://data360api.worldbank.org/data360/data"
        params = {
            'DATABASE_ID': 'IMF_FAS',
            'INDICATOR': 'IMF_FAS_FCMIBT',
            'REF_AREA': country,
            'timePeriodFrom': start_year,
            'timePeriodTo': end_year,
            'skip': 0
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        wb_data = response.json()
        
        if isinstance(wb_data, dict) and 'data' in wb_data and isinstance(wb_data['data'], list):
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data['data']})
            }
        elif isinstance(wb_data, dict) and 'value' in wb_data:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': wb_data['value']})
            }
        else:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'data': []})
            }
    except requests.exceptions.RequestException as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"error": f"API request failed: {str(e)}"})
        }
