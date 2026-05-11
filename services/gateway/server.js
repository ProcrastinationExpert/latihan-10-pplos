const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 5, // maksimal 5 request per menit per IP
  message: {
    error: "Terlalu banyak permintaan, coba lagi nanti.",
  },
});

app.use("/klasifikasi", limiter);

const PYTHON_SERVICE_URL = "http://127.0.0.1:9127/prediksi";

app.post("/klasifikasi", async (req, res) => {
  try {
    const { ph, lembap_udara } = req.body;

    if (ph === undefined || lembap_udara === undefined) {
      return res
        .status(400)
        .json({ error: "Data ph dan lembap_udara diperlukan" });
    }

    const pythonResponse = await axios.post(PYTHON_SERVICE_URL, {
      ph: ph,
      lembap_udara: lembap_udara,
    });

    const { prediksi, nilai_confidence } = pythonResponse.data;

    res.json({
      input: {
        ph: ph,
        lembap_udara: lembap_udara,
      },
      prediksi: prediksi,
      model_confidence: nilai_confidence,
    });
  } catch (error) {
    console.error("Error menghubungi ML Service:", error.message);
    res.status(500).json({
      error: "Terjadi kesalahan pada server saat menghubungi service prediksi",
    });
  }
});

const PORT = 9126;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Gateway Service berjalan di port ${PORT}`);
});
