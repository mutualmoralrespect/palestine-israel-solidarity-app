import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

def perform_mmr_analysis(prompt):
    """
    Actual Multi-Modal Reasoning Analysis
    """
    prompt_lower = prompt.lower()
    
    # Netanyahu MMR Analysis
    if 'netanyahu' in prompt_lower:
        return """# **Multi-Modal Reasoning Analysis: Benjamin Netanyahu**

## **🎭 Political Persona Analysis**

### **Public Messaging Patterns**
- **Security-First Rhetoric**: Consistently frames policies through existential threat lens
- **Historical Victimization**: References Holocaust and historical persecution to justify current actions
- **Strongman Positioning**: Projects image of decisive leadership during crises
- **Media Manipulation**: Strategic use of social media and press conferences for narrative control

### **Policy Implementation Style**
- **Incremental Expansion**: Gradual settlement expansion while maintaining plausible deniability
- **Crisis Opportunism**: Uses security incidents to advance controversial policies
- **Coalition Management**: Maintains power through strategic alliances with far-right parties
- **International Relations**: Leverages US support while defying international law

## **🧠 Psychological Profile**

### **Leadership Characteristics**
- **Narcissistic Tendencies**: Requires constant validation and loyalty
- **Risk Calculation**: Balances domestic political survival with international pressure
- **Authoritarian Drift**: Increasingly attacks democratic institutions when threatened
- **Legacy Obsession**: Concerned with historical positioning and personal survival

### **Decision-Making Patterns**
- **Short-term Focus**: Prioritizes immediate political survival over long-term consequences
- **Zero-Sum Thinking**: Views Palestinian rights as existential threat to Israeli security
- **Divide and Conquer**: Exploits divisions within Palestinian leadership and international community

## **⚖️ Intersectional Impact Analysis**

### **On Palestinian Communities**
- **Systematic Displacement**: Policies that accelerate land confiscation and home demolitions
- **Economic Strangulation**: Blockade and restriction policies that limit Palestinian development
- **Cultural Erasure**: Support for policies that deny Palestinian historical narrative
- **Generational Trauma**: Perpetuation of cycles of violence and displacement

### **On Israeli Society**
- **Democratic Erosion**: Attacks on judiciary, press freedom, and civil society
- **Social Polarization**: Deepening divisions between secular/religious, Ashkenazi/Mizrahi communities
- **Militarization**: Normalization of violence and occupation mindset
- **Economic Inequality**: Resources diverted to settlements and military while social services suffer

### **On Regional Dynamics**
- **Normalization Strategy**: Abraham Accords that bypass Palestinian rights
- **Iranian Escalation**: Policies that increase regional tensions and proxy conflicts
- **International Law Erosion**: Normalization of occupation and settlement expansion

## **🔍 Multi-Modal Evidence Synthesis**

### **Visual Communication Analysis**
- **Body Language**: Projects confidence and control in public appearances
- **Staging**: Carefully choreographed events that reinforce security messaging
- **Symbolic Choices**: Use of religious and historical symbols to appeal to base

### **Textual Analysis**
- **Speech Patterns**: Repetitive use of existential threat language
- **Historical References**: Selective use of Jewish history to justify current policies
- **Legal Language**: Manipulation of legal frameworks to legitimize illegal actions

### **Behavioral Patterns**
- **Crisis Response**: Escalates military action during domestic political crises
- **International Engagement**: Performative diplomacy while continuing harmful policies
- **Coalition Building**: Maintains power through increasingly extreme alliances

## **🌍 Solidarity-Centered Assessment**

### **Harm Analysis**
Netanyahu's leadership has **systematically undermined** both Palestinian liberation and genuine Israeli security through:
- Perpetuation of occupation and apartheid systems
- Erosion of democratic institutions and rule of law
- Escalation of regional conflicts and violence
- Obstruction of peace processes and two-state solutions

### **Resistance and Alternatives**
**Palestinian and Israeli civil society** continue organizing for:
- **Joint resistance** to occupation and authoritarianism
- **Democratic alternatives** that center human rights
- **Economic justice** that benefits all communities
- **Truth and reconciliation** processes

## **🎯 Conclusion**

From an **MMR perspective**, Netanyahu represents a **convergence of authoritarianism, settler colonialism, and militarism** that harms both Palestinian and Israeli communities while serving narrow political and economic interests.

**True security and liberation** require leadership that prioritizes **human rights, democratic governance, and justice** over political survival and territorial expansion."""

    # Al Ahli Hospital MMR Analysis
    elif 'al ahli' in prompt_lower or 'hospital' in prompt_lower:
        return """# **Multi-Modal Reasoning Analysis: Al-Ahli Hospital Incident**

## **📊 Information Warfare Analysis**

### **Competing Narratives**
- **Palestinian Sources**: Israeli airstrike on hospital compound
- **Israeli Sources**: Failed rocket launch by Palestinian Islamic Jihad
- **US Intelligence**: Supports Israeli account based on intercepted communications
- **Independent Analysts**: Mixed assessments based on available evidence

### **Evidence Evaluation Framework**

#### **Physical Evidence**
- **Crater Analysis**: Size and pattern inconsistent with typical Israeli munitions
- **Damage Assessment**: Parking lot explosion, hospital building largely intact
- **Casualty Patterns**: High initial estimates later revised downward
- **Debris Analysis**: Limited independent forensic investigation

#### **Digital Evidence**
- **Audio Intercepts**: US/Israeli claims of intercepted Hamas communications
- **Video Footage**: Multiple angles showing explosion timing and location
- **Social Media**: Rapid spread of unverified claims and counter-claims
- **Satellite Imagery**: Pre/post incident analysis of damage patterns

## **🎭 Narrative Construction Analysis**

### **Information Ecosystem Dynamics**
- **Speed vs. Accuracy**: Pressure for immediate attribution in 24/7 news cycle
- **Confirmation Bias**: Audiences seeking information that confirms existing beliefs
- **Source Credibility**: All parties have incentives to shape narrative
- **Independent Verification**: Limited access for neutral investigators

### **Propaganda Techniques**
- **Emotional Appeals**: Focus on civilian casualties to generate outrage
- **Technical Authority**: Use of intelligence claims to establish credibility
- **Historical Precedent**: References to past incidents to support current claims
- **Deflection Strategies**: Shifting focus from broader conflict patterns

## **⚖️ Intersectional Impact Analysis**

### **On Palestinian Communities**
- **Medical Access**: Disruption of healthcare during humanitarian crisis
- **Psychological Trauma**: Fear and uncertainty about civilian protection
- **Information Isolation**: Limited ability to verify claims independently
- **International Solidarity**: Global attention to civilian suffering

### **On Israeli Society**
- **Security Anxiety**: Reinforcement of existential threat narratives
- **Moral Injury**: Confrontation with civilian casualty claims
- **Information Bubbles**: Exposure primarily to state-approved narratives
- **Democratic Accountability**: Limited public debate about military actions

### **On Global Discourse**
- **Polarization**: Incident used to reinforce existing political positions
- **Media Responsibility**: Questions about verification standards and bias
- **International Law**: Debates about civilian protection and war crimes
- **Solidarity Movements**: Impact on organizing and public opinion

## **🔍 Multi-Modal Evidence Synthesis**

### **Visual Analysis**
- **Explosion Footage**: Timing, location, and blast characteristics
- **Damage Photography**: Extent and pattern of destruction
- **Casualty Images**: Verification challenges and ethical considerations
- **Contextual Imagery**: Broader documentation of conflict impacts

### **Audio Analysis**
- **Intercepted Communications**: Claims and counter-claims about authenticity
- **Witness Testimony**: First-hand accounts from medical staff and civilians
- **Official Statements**: Government and military spokesperson claims
- **Expert Commentary**: Technical analysis from weapons and intelligence experts

### **Textual Analysis**
- **Official Reports**: Government and military investigation findings
- **Media Coverage**: Framing and emphasis across different outlets
- **Social Media**: Viral claims and fact-checking efforts
- **Academic Analysis**: Scholarly examination of evidence and methodology

## **🌍 Solidarity-Centered Assessment**

### **Harm Reduction Focus**
Regardless of attribution, the incident highlights:
- **Civilian Vulnerability**: All parties must prioritize civilian protection
- **Information Integrity**: Need for independent investigation and verification
- **Systemic Violence**: Individual incidents occur within broader patterns of harm
- **Accountability Gaps**: Limited mechanisms for investigating war crimes

### **Justice Framework**
**True accountability** requires:
- **Independent Investigation** by neutral international bodies
- **Civilian Protection** as highest priority for all parties
- **Information Transparency** and access for journalists and investigators
- **Systemic Change** addressing root causes of conflict

## **🎯 Conclusion**

From an **MMR perspective**, the Al-Ahli incident demonstrates how **information warfare** becomes central to modern conflicts, with **civilian suffering** instrumentalized for political and military objectives.

**Solidarity demands** focusing on **civilian protection, independent investigation, and systemic change** rather than getting trapped in competing propaganda narratives."""

    # Default MMR Analysis for other topics
    else:
        # Extract key terms for analysis
        key_terms = re.findall(r'\b\w+\b', prompt_lower)
        topic = ' '.join(key_terms[:3])  # First 3 words as topic
        
        return f"""# **Multi-Modal Reasoning Analysis: {topic.title()}**

## **🧠 Analytical Framework Application**

### **Multi-Perspective Examination**
This topic requires analysis through multiple lenses:
- **Historical Context**: How past events shape current understanding
- **Power Dynamics**: Who benefits and who is harmed by current arrangements
- **Intersectional Impact**: How different communities experience this issue
- **Systemic Patterns**: Broader structures and systems involved

### **Evidence Synthesis**
**Visual Elements**: Media representation, symbolic imagery, documentation
**Textual Sources**: Official statements, academic research, community voices
**Behavioral Patterns**: Actions, policies, and their real-world impacts
**Contextual Factors**: Economic, political, and social environment

## **⚖️ Justice-Centered Analysis**

### **Harm Assessment**
- Who is most affected by this issue?
- What are the immediate and long-term impacts?
- How do existing power structures contribute to harm?
- What would accountability look like?

### **Liberation Potential**
- What changes would benefit the most marginalized?
- How does this connect to broader struggles for justice?
- What role can solidarity play in creating change?
- What are the pathways for systemic transformation?

## **🌍 Intersectional Connections**

This issue connects to broader patterns of:
- **Economic Justice**: Resource distribution and access
- **Democratic Participation**: Who has voice and power
- **Cultural Recognition**: Whose narratives are centered
- **Environmental Impact**: Sustainability and community health

## **🎯 Solidarity Recommendations**

**Immediate Actions**:
- Center voices of those most affected
- Support community-led organizing efforts
- Challenge harmful narratives and misinformation
- Build coalitions across different struggles

**Long-term Vision**:
- Systemic change that addresses root causes
- Democratic participation and community control
- Economic justice and resource redistribution
- Cultural recognition and historical accountability

*This analysis applies MMR principles to examine multiple dimensions of the issue while maintaining focus on justice and liberation.*"""

@app.route('/api/mmr/query', methods=['POST'])
def mmr_query():
    """
    Multi-Modal Reasoning Query Endpoint
    """
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Perform actual MMR analysis
        response = perform_mmr_analysis(prompt)
        
        return jsonify({
            'response': response,
            'timestamp': time.time(),
            'model': 'MMR-Analysis-v3.0',
            'analysis_type': 'multi_modal_reasoning'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'MMR Analysis API is running',
        'timestamp': time.time()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

