import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

@app.route('/api/mmr/query', methods=['POST'])
def mmr_query():
    """
    MMR Model Query Endpoint
    This is a mock endpoint that simulates the MMR model response.
    Replace this with actual MMR model integration when available.
    """
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Simulate processing time
        time.sleep(random.uniform(1, 3))
        
        # Mock response based on prompt content
        if 'palestine' in prompt.lower() or 'solidarity' in prompt.lower():
            response = f"""Intersectional solidarity with Palestine recognizes that liberation struggles are interconnected. When we support Palestinian freedom, we also challenge systems of oppression that affect marginalized communities globally.

Key principles for intersectional Palestine solidarity:

1. **Centering Palestinian voices**: Amplify Palestinian perspectives and leadership in solidarity work.

2. **Connecting struggles**: Recognize links between Palestinian liberation and other justice movements (racial justice, Indigenous rights, anti-imperialism).

3. **Challenging all forms of oppression**: Address how racism, sexism, classism, and other systems intersect with colonialism.

4. **Building inclusive coalitions**: Create spaces where diverse communities can contribute to Palestinian solidarity while addressing their own liberation needs.

5. **Educational approach**: Share knowledge about Palestinian history and current conditions while connecting to broader patterns of injustice.

This approach strengthens both Palestinian liberation and other justice movements by building broader, more sustainable coalitions for change."""
        
        elif 'intersectional' in prompt.lower():
            response = f"""Intersectionality, coined by Kimberlé Crenshaw, reveals how multiple forms of oppression interact and compound. In solidarity work, this means:

- Understanding that people experience multiple, overlapping identities
- Recognizing that liberation movements must address various forms of oppression simultaneously
- Building coalitions that center the most marginalized voices
- Challenging single-issue approaches that ignore complexity

Applied to Palestine solidarity, intersectionality helps us see connections between anti-Palestinian racism, Islamophobia, anti-Semitism, and other forms of oppression, creating more comprehensive and effective resistance strategies."""
        
        else:
            response = f"""Thank you for your query: "{prompt}"

This MMR (Multi-Modal Reasoning) model is designed with intersectional solidarity principles at its core. I aim to provide responses that:

- Center justice and liberation
- Acknowledge multiple perspectives and experiences  
- Connect individual struggles to broader systems of oppression
- Promote understanding and solidarity across communities
- Respect human dignity and self-determination

Your question touches on important themes. I encourage continued exploration of these topics through multiple sources and community engagement."""
        
        return jsonify({
            'response': response,
            'timestamp': time.time(),
            'model': 'MMR-Solidarity-v1.0'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'MMR API is running',
        'timestamp': time.time()
    })

@app.route('/api/mmr/info', methods=['GET'])
def mmr_info():
    """Information about the MMR model"""
    return jsonify({
        'model_name': 'MMR-Solidarity',
        'version': '1.0',
        'description': 'Multi-Modal Reasoning model designed with intersectional solidarity principles',
        'capabilities': [
            'Text generation and analysis',
            'Intersectional perspective integration',
            'Solidarity-focused responses',
            'Justice-centered reasoning'
        ],
        'note': 'This is a mock API. Replace with actual MMR model integration.'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

