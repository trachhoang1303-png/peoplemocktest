/**
 * ExamShield Simulation - Logic & Ngân hàng câu hỏi
 * Tài liệu tham khảo: LanguageCert Communicator B2 Practice Paper
 */

// 1. NGÂN HÀNG CÂU HỎI THỰC TẾ ĐỀ B2
const examQuestions = [
    // --- LISTENING PART 1 ---
    {
        text: "<b>Listening Part 1</b><br>You will hear some short conversations. Choose the correct answer to complete each conversation.<br><br><i>Conversation 1:</i><br>M: What’s the problem?<br>F: I can’t decide where to go on holiday.<br>M: Why don’t you go where you go every year?",
        options: [
            "I didn’t enjoy it so much last year.",
            "I’ve never thought of that before.",
            "I didn’t know what you meant."
        ],
        correct: 0
    },
    {
        text: "<b>Listening Part 1</b><br><br><i>Conversation 2:</i><br>F: Do you think you could help me with this report?<br>M: I’m afraid I’m a bit busy at the moment.<br>F: It’ll only take a few minutes.",
        options: [
            "I really don’t have the time.",
            "I’ve got nothing better to do.",
            "When will you write it?"
        ],
        correct: 0
    },
    {
        text: "<b>Listening Part 1</b><br><br><i>Conversation 3:</i><br>F: Have you finished with that book of mine yet?<br>M: Oh, I really need to talk to you about that.<br>F: What’s the problem then?",
        options: [
            "It’s absolutely brilliant, isn’t it?",
            "We’ve already talked about that.",
            "I’m afraid I’ve lost it somewhere."
        ],
        correct: 2
    },
    {
        text: "<b>Listening Part 1</b><br><br><i>Conversation 4:</i><br>M: What do you think you’re doing?<br>F: I’m just having a look round.<br>M: But you’re not allowed in here.",
        options: [
            "No, I didn’t want to go.",
            "Sorry, I didn’t realise.",
            "Yes, it’s still a bit loud."
        ],
        correct: 1
    },
    {
        text: "<b>Listening Part 1</b><br><br><i>Conversation 5:</i><br>F: There she is. That’s Monica.<br>M: I don’t think I know her.<br>F: But you do. You met her last year.",
        options: [
            "I do meet her every year.",
            "I’d totally forgotten that.",
            "It must be the same girl."
        ],
        correct: 1
    },
    
    // --- LISTENING PART 2 ---
    {
        text: "<b>Listening Part 2</b><br>You will hear some conversations. Choose the correct answers for each conversation.<br><br><i>Conversation 1:</i><br>John and Jenny are talking about Noel's relationships.<br><br><b>Question:</b> The woman thinks Noel’s ex-girlfriend...",
        options: [
            "spent too little time with him.",
            "always agreed with him.",
            "made all the couple’s plans."
        ],
        correct: 2
    },
    {
text: "<b>Listening Part 2 - Conversation 1</b><br><br><b>Question:</b> How do the speakers feel about Noel’s new relationship? They’re...",
        options: [
            "hopeful.",
            "worried.",
            "excited."
        ],
        correct: 0
    },

    // --- LISTENING PART 4 ---
    {
        text: "<b>Listening Part 4</b><br>You will hear a conversation between Fran and Jim about office life 50 years ago. Choose the correct answers.<br><br><b>Question 1:</b> Fran knows about ‘typing pools’ because...",
        options: [
            "she used to work in one.",
            "her mother was a typist.",
            "they were popular with typists."
        ],
        correct: 1
    },
    {
        text: "<b>Listening Part 4</b><br><br><b>Question 2:</b> When he watched the programme, Jim was impressed by people’s...",
        options: [
            "long working hours in the office.",
            "workload in their homes.",
            "separation of work and home."
        ],
        correct: 2
    },

    // --- READING PART 1 ---
    {
        text: "<b>Reading Part 1</b><br>Read the text and choose the correct answer.<br><br><div style='background:#1a3047; padding:15px; border-radius:6px; margin-bottom:15px; font-size:15px;'><b>There’s a reason why we love computer games</b><br>...Originally, computers were all work and no play... But computer engineers and designers soon began to get comfortable with their big machines. It occurred to some of them that it might be a good idea to have the computer show some spaceships and planets... And in the 1960s a group of fun-loving computer geniuses created a game called <b>SpaceWar</b> in their idle hours...</div><b>Question 1:</b> SpaceWar was developed...",
        options: [
            "as part of a serious computer project.",
            "by computer experts in their spare time.",
            "to show people what space travel is like."
        ],
        correct: 1
    },
    {
        text: "<b>Reading Part 1 - There’s a reason why we love computer games</b><br><br><b>Question 2:</b> After SpaceWar, more games appeared because...",
        options: [
            "computer design improved.",
            "it wasn’t exciting enough.",
            "people enjoyed playing it."
        ],
        correct: 2
    }
];

// 2. BIẾN QUẢN LÝ TRẠNG THÁI HỆ THỐNG THI
let currentIdx = 0;
let selectedAnswers = new Array(examQuestions.length).fill(null);
let timeRemaining = 2 * 60 * 60 + 10 * 60; // Đúng chuẩn thời gian Reading & Writing: 2 giờ 10 phút
let timerInterval;

// 3. HÀM KHỞI CHẠY BÀI THI
function initExam() {
    renderGrid();
    loadQuestion(0);
    startTimer();
}

// 4. BỘ ĐẾM NGƯỢC THỜI GIAN CHUẨN EXAMSHIELD
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitExam();
return;
        }
        timeRemaining--;
        let hours = Math.floor(timeRemaining / 3600);
        let mins = Math.floor((timeRemaining % 3600) / 60);
        let secs = timeRemaining % 60;
        
        // Hiển thị dạng HH:MM:SS hoặc MM:SS tùy độ dài thời gian
        let displayTime = hours > 0 ? 
            `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` :
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
        document.getElementById('timer').innerText = displayTime;
    }, 1000);
}

// 5. RENDER LƯỚI ĐIỀU HƯỚNG CÂU HỎI (BÊN PHẢI)
function renderGrid() {
    const grid = document.getElementById('question-grid');
    if (!grid) return;
    grid.innerHTML = '';
    examQuestions.forEach((_, index) => {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.id = `grid-item-${index}`;
        item.innerText = index + 1;
        item.addEventListener('click', () => loadQuestion(index));
        grid.appendChild(item);
    });
}

// 6. TẢI NỘI DUNG CÂU HỎI LÊN GIAO DIỆN
function loadQuestion(index) {
    currentIdx = index;
    const q = examQuestions[index];
    
    // Cập nhật trạng thái màu sắc trên Lưới câu hỏi bên phải
    examQuestions.forEach((_, i) => {
        const item = document.getElementById(`grid-item-${i}`);
        if (!item) return;
        item.classList.remove('active');
        if (selectedAnswers[i] !== null) {
            item.classList.add('answered'); // Đã trả lời -> Xanh lá
        } else {
            item.classList.remove('answered');
        }
    });
    
    const activeItem = document.getElementById(`grid-item-${index}`);
    if (activeItem) activeItem.classList.add('active'); // Đang xem -> Viền xanh dương

    // Điền tiêu đề và nội dung câu hỏi
    document.getElementById('question-number-title').innerText = `Question ${index + 1} of ${examQuestions.length}`;
    document.getElementById('question-text').innerHTML = q.text;

    // Điền danh sách đáp án trắc nghiệm A, B, C...
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D', 'E'];
    q.options.forEach((opt, optIdx) => {
        const li = document.createElement('li');
        li.className = 'option-item';
        if (selectedAnswers[index] === optIdx) {
            li.classList.add('selected');
        }
        
        li.innerHTML = `
            <div class="option-radio"></div>
            <div><span class="option-letter">${letters[optIdx]}.</span> ${opt}</div>
        `;
        
        li.addEventListener('click', () => makeSelection(optIdx));
        container.appendChild(li);
    });

    // Bật/tắt trạng thái các nút điều hướng bên dưới đáy màn hình
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