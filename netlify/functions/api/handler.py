from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

ASEAN_COUNTRIES = ["BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "VNM"]

@app.route('/api/gdp-per-capita', methods=['GET'])
def get_gdp_per_capita():
    try:
        start_year = request.args.get('from', '1960')
        end_year = request.args.get('to', '2023')
        country = request.args.get('country', 'MYS').upper()
        url = f"https://data360api.worldbank.org/data360/data"
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
            return jsonify({'data': wb_data['data']})
        else:
            return jsonify({'data': wb_data})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/credit-card-usage', methods=['GET'])
def get_credit_card_usage():
    try:
        start_year = request.args.get('from', '1960')
        end_year = request.args.get('to', '2023')
        country = request.args.get('country', 'MYS').upper()
        url = f"https://data360api.worldbank.org/data360/data"
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
            return jsonify({'data': wb_data['data']})
        elif isinstance(wb_data, dict) and 'value' in wb_data:
            return jsonify({'data': wb_data['value']})
        else:
            return jsonify({'data': []})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/inflation', methods=['GET'])
def get_inflation():
    try:
        start_year = request.args.get('from', '1960')
        end_year = request.args.get('to', '2023')
        country = request.args.get('country', 'MYS').upper()
        url = f"https://data360api.worldbank.org/data360/data"
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
            return jsonify({'data': wb_data['data']})
        else:
            return jsonify({'data': wb_data})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/cpi', methods=['GET'])
def get_cpi():
    try:
        start_year = request.args.get('from', '1960')
        end_year = request.args.get('to', '2023')
        country = request.args.get('country', 'MYS').upper()
        url = f"https://data360api.worldbank.org/data360/data"
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
            return jsonify({'data': wb_data['data']})
        else:
            return jsonify({'data': wb_data})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/mobile-internet-banking', methods=['GET'])
def get_mobile_internet_banking():
    try:
        start_year = request.args.get('from', '1960')
        end_year = request.args.get('to', '2024')
        country = request.args.get('country', 'MYS').upper()
        url = f"https://data360api.worldbank.org/data360/data"
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
            return jsonify({'data': wb_data['data']})
        elif isinstance(wb_data, dict) and 'value' in wb_data:
            return jsonify({'data': wb_data['value']})
        else:
            return jsonify({'data': []})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

handler = app
