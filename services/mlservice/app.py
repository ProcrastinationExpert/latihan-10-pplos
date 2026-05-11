from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/prediksi', methods=['POST'])
def prediksi():
    data = request.get_json()
    
    if not data or 'ph' not in data or 'lembap_udara' not in data:
        return jsonify({"error": "Format data salah. Masukkan ph dan lembap_udara"}), 400

    ph = data['ph']
    humidity = data['lembap_udara']
    
    prediksi_hasil = "Ideal"
    if ph < 5.5:
        prediksi_hasil = "Terlalu Asam"
    elif ph > 7.5:
        prediksi_hasil = "Terlalu Basa"
    elif humidity < 60:
        prediksi_hasil = "Kering"
    elif humidity > 90:
        prediksi_hasil = "Terlalu Lembap"
        
    confidence = 0.85
    
    return jsonify({
        "prediksi": prediksi_hasil,
        "nilai_confidence": confidence
    })

if __name__ == '__main__':
    app.run(host='localhost', port=9126)