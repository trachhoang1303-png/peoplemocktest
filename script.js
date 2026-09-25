<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Thi Thử Tiếng Anh</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
        }
        .quiz-container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .question {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #34495e;
        }
        .answers {
            list-style: none;
            padding: 0;
        }
        .answers li {
            margin-bottom: 12px;
        }
        .answers button {
            width: 100%;
            padding: 12px;
            text-align: left;
            background-color: #ecf0f1;
            border: 2px solid #bdc3c7;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .answers button:hover {
            background-color: #3498db;
            color: white;
            border-color: #3498db;
        }
        .score-container {
            text-align: center;
            display: none;
        }
        .score-container h2 {
            color: #27ae60;
            font-size: 28px;
        }
        .btn-restart {
            background-color: #2ecc71;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }
        .btn-restart:hover {
            background-color: #27ae60;
        }
    </style>
</head>
<body>

<div class="quiz-container">
    <h1>📝 Thi Thử Tiếng Anh</h1>
    
    <!-- Vùng hiển thị câu hỏi -->
    <div id="quiz-box">
        <div class="question" id="question-text">Đang tải câu hỏi...</div>
        <ul class="answers" id="answer-buttons">
            <!-- Câu trả lời sẽ tự động sinh ra ở đây -->
        </ul>
    </div>

    <!-- Vùng hiển thị kết quả -->
    <div class="score-container" id="score-box">
        <h2>Chúc mừng bạn đã hoàn thành!</h2>
        <p id="score-text">Bạn đúng 0/0 câu.</p>
        <button class="btn-restart" onclick="restartQuiz()">Thi lại</button>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>
