import wikipedia
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Set the language to English
wikipedia.set_lang('en')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_dob', methods=['POST'])
def get_dob():
    name = request.form.get('name')
    try:
        # Fetch the summary of the Wikipedia page
        summary = wikipedia.summary(name, sentences=1)
        # Check if the summary contains a date of birth
        if 'born' in summary.lower():
            return jsonify({"dob": summary})
        else:
            return jsonify({"dob": "Date of birth not found in the Wikipedia page."})
    except wikipedia.exceptions.DisambiguationError as e:
        return jsonify({"dob": f"Multiple entries found: {e.options}"})
    except wikipedia.exceptions.HTTPTimeoutError:
        return jsonify({"dob": "Error: Request timed out."})
    except Exception as e:
        return jsonify({"dob": f"An error occurred: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
