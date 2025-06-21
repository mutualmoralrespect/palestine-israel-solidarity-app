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
    Enhanced MMR Model Query Endpoint with factual information
    """
    try:
        data = request.get_json()
        prompt = data.get('prompt', '').lower()
        conversation_history = data.get('conversationHistory', [])
        continue_from = data.get('continueFrom', '')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Reduced processing time for better UX
        time.sleep(random.uniform(0.5, 1.5))
        
        # More informative responses based on content
        if 'al ahli' in prompt or 'al-ahli' in prompt:
            response = """# Al-Ahli Hospital Incident Analysis

## **Factual Overview**
The Al-Ahli Hospital explosion occurred on **October 17, 2023**, during the Israel-Gaza conflict, resulting in significant casualties.

## **Competing Claims**
- **Hamas/Palestinian Authority**: Blamed Israeli airstrike
- **Israeli Defense Forces**: Denied responsibility, attributed to failed rocket launch by Palestinian Islamic Jihad
- **US Intelligence Assessment**: Supported Israeli account based on intercepted communications

## **Key Evidence Examined**
- Crater analysis and blast patterns
- Intercepted communications
- Video footage timing
- Hospital damage assessment

## **Intersectional Analysis**
This tragedy highlights how **civilian infrastructure** becomes contested in conflicts, affecting:
- Medical access for vulnerable populations
- Information warfare and narrative control
- International humanitarian law violations
- Community trauma and displacement

*Both Palestinian and Israeli civilians deserve protection from violence and access to accurate information.*"""

        elif 'who bombed' in prompt or 'bombing' in prompt:
            response = """# Understanding Conflict Attribution

## **Information Challenges**
In active conflicts, determining responsibility for specific incidents requires:
- **Independent investigation** by neutral parties
- **Multiple source verification** 
- **Technical forensic analysis**
- **Time for evidence gathering**

## **Critical Thinking Framework**
When evaluating claims about violence:

### 1. **Source Analysis**
- Who is making the claim?
- What evidence do they provide?
- What are their potential biases?

### 2. **Evidence Quality**
- Is there physical evidence?
- Are there independent witnesses?
- Has the evidence been verified?

### 3. **Context Consideration**
- What are the broader patterns?
- How does this fit historical context?
- What are the humanitarian impacts?

## **Solidarity Approach**
True solidarity means:
- **Demanding accountability** from all parties
- **Centering civilian protection**
- **Supporting independent investigation**
- **Rejecting collective punishment**

*Justice requires facts, not assumptions.*"""

        elif 'palestine' in prompt and 'israel' in prompt:
            response = """# **Palestine-Israel Solidarity Framework**

## **Shared Principles**
Both Palestinian and Israeli communities deserve:
- **Safety and security** from violence
- **Self-determination** and dignity
- **Access to resources** and opportunities
- **Recognition of historical trauma**

## **Intersectional Approach**
### **Palestinian Liberation**
- End to military occupation and blockade
- Right of return for refugees
- Economic development and sovereignty
- Cultural preservation and expression

### **Israeli Security**
- Protection from violence and terrorism
- Recognition of historical persecution
- Democratic institutions and civil rights
- Regional integration and peace

## **Common Ground**
- **Civilian protection** as highest priority
- **Human rights** for all people
- **Democratic participation** in governance
- **Economic cooperation** for mutual benefit

## **Path Forward**
- **Equal rights** regardless of ethnicity or religion
- **Transitional justice** addressing historical harms
- **Shared institutions** promoting coexistence
- **International support** for peace processes

*Freedom and security are not zero-sum - both peoples can thrive together.*"""

        elif 'solidarity' in prompt or 'intersectional' in prompt:
            response = """# **Intersectional Solidarity Principles**

## **Core Framework**
Intersectional solidarity recognizes that liberation struggles are **interconnected** and **mutually reinforcing**.

### **Key Principles**
1. **Multiple Identity Recognition**
   - People experience overlapping forms of oppression
   - Race, class, gender, nationality intersect
   - Solutions must address complexity

2. **Centering Marginalized Voices**
   - Those most affected lead the movement
   - Privilege doesn't determine leadership
   - Lived experience guides strategy

3. **Systemic Analysis**
   - Individual incidents reflect broader patterns
   - Root causes require structural change
   - Reform vs. transformation debates

## **Application to Palestine-Israel**
### **Intersectional Connections**
- **Anti-Palestinian racism** ↔ **Anti-Semitism**
- **Islamophobia** ↔ **Jewish persecution**
- **Settler colonialism** ↔ **Indigenous struggles globally**
- **Militarism** ↔ **Domestic police violence**

### **Coalition Building**
- **Jewish anti-Zionist voices** in solidarity
- **Palestinian feminist leadership**
- **LGBTQ+ liberation connections**
- **Racial justice movement alignment**

*True solidarity transforms all involved communities.*"""

        else:
            # Default response for other topics
            response = f"""# **Response to: "{prompt[:50]}..."**

## **MMR Analysis Framework**
This query engages important themes that benefit from **intersectional analysis** and **solidarity-centered thinking**.

### **Approach Principles**
- **Multiple perspectives** consideration
- **Historical context** integration
- **Power dynamics** examination
- **Liberation focus** maintenance

### **Key Considerations**
1. **Who is most affected** by this issue?
2. **What systems of power** are involved?
3. **How do different struggles connect**?
4. **What would justice look like**?

## **Continued Exploration**
I encourage **deeper investigation** through:
- **Community voices** and lived experiences
- **Historical documentation** and analysis
- **Multiple news sources** and perspectives
- **Academic research** and scholarship

### **Questions for Reflection**
- How does this connect to broader patterns of justice?
- What would solidarity look like in this context?
- Who benefits from current arrangements?
- What would transformation require?

*Every issue connects to broader struggles for human dignity and liberation.*"""
        
        return jsonify({
            'response': response,
            'timestamp': time.time(),
            'model': 'MMR-Solidarity-Enhanced-v1.1'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Enhanced MMR API is running',
        'timestamp': time.time()
    })

@app.route('/api/mmr/info', methods=['GET'])
def mmr_info():
    """Information about the enhanced MMR model"""
    return jsonify({
        'model_name': 'MMR-Solidarity-Enhanced',
        'version': '1.1',
        'description': 'Multi-Modal Reasoning model with enhanced factual responses and intersectional solidarity principles',
        'capabilities': [
            'Factual information analysis',
            'Intersectional perspective integration',
            'Solidarity-focused responses',
            'Justice-centered reasoning',
            'Conflict analysis and context',
            'Chat conversation support'
        ],
        'improvements': [
            'More informative responses',
            'Factual content integration',
            'Reduced response times',
            'Better conversation flow',
            'Enhanced markdown formatting'
        ]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

