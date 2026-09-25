document.getElementById('btn-prev').disabled = (index === 0);
    document.getElementById('btn-next').disabled = (index === examQuestions.length - 1);
}

// 7. LƯU LỰA CHỌN CỦA HỌC VIÊN
function makeSelection(optIdx) {
    selectedAnswers[currentIdx] = optIdx;
    loadQuestion(currentIdx);
}

// 8. ĐIỀU HƯỚNG: CÂU TIẾP THEO
function nextQuestion() {
    if (currentIdx < examQuestions.length - 1) {
        loadQuestion(currentIdx + 1);
    }
}

// 9. ĐIỀU HƯỚNG: CÂU TRƯỚC ĐÓ
function prevQuestion() {
    if (currentIdx > 0) {
        loadQuestion(currentIdx - 1);
    }
}

// 10. HÀM TÍNH ĐIỂM VÀ NỘP BÀI THI
function submitExam() {
    // Hỏi xác nhận trước khi nộp giống hệ thống thật
    if (timeRemaining > 0 && !confirm("Bạn có chắc chắn muốn nộp bài thi ngay bây giờ không?")) {
        return;
    }

    clearInterval(timerInterval);
    let score = 0;
    
    examQuestions.forEach((q, i) => {
        if (selectedAnswers[i] === q.correct) {
            score++;
        }
    });

    // Hiển thị màn hình kết quả (Popup Overlay)
    document.getElementById('score-text').innerText = `${score} / ${examQuestions.length} ĐÚNG`;
    document.getElementById('result-screen').style.display = 'flex';
}

// 11. THI LẠI TỪ ĐẦU (RESET HỆ THỐNG)
function restartExam() {
    selectedAnswers = new Array(examQuestions.length).fill(null);
