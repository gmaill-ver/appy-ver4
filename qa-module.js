/**
 * QAModule - 一問一答専用モジュール（削除済み問題復活防止版）
 */
class QAModuleClass {
    constructor() {
        this.currentSet = [];
        this.currentIndex = 0;
        this.answerShown = false;
        this.stats = {
            total: 0,
            correct: 0,
            wrong: 0
        };
        this.sessionActive = false;
        this.currentSetName = '';
    }

    /**
     * 初期化
     */
    initialize() {
        // DataManagerが初期化されるまで待つ
        if (!window.DataManager) {
            setTimeout(() => this.initialize(), 100);
            return;
        }
    }

    /**
     * セット選択
     */
    selectSet(setName) {
        this.currentSetName = setName;
        const select = document.getElementById('qaSetSelect');
        if (select) {
            select.value = setName;
        }
    }

    /**
     * スタートオプション表示
     */
    showStartOptions() {
        const content = document.getElementById('qaContent');
        if (!content) return;
        
        content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>学習を開始</h3>
                <p>問題集を選択して開始ボタンを押してください</p>
                <button class="save-button" style="margin-top: 20px;" onclick="QAModule.handleStart()">
                    学習開始
                </button>
            </div>
        `;
    }

    /**
     * 管理ダイアログ表示
     */
    showManageDialog() {
        // 管理画面は親コンポーネントで表示されるため、ここでは何もしない
        console.log('Manage dialog requested');
    }

    /**
     * 一問一答開始
     */
    startSession(setName) {
        if (!setName || !DataManager.qaQuestions[setName]) {
            alert('問題集を選択してください');
            return false;
        }

        this.currentSet = [...this.getQuestions(setName)]; // ★修正: 削除済み問題を除外
        this.currentIndex = 0;
        this.answerShown = false;
        this.stats = {
            total: this.currentSet.length,
            correct: 0,
            wrong: 0
        };
        this.sessionActive = true;

        this.updateProgress();
        this.showQuestion();
        return true;
    }

    /**
     * 現在の問題を表示
     */
    showQuestion() {
        if (!this.sessionActive || this.currentIndex >= this.currentSet.length) {
            this.endSession();
            return;
        }

        const question = this.currentSet[this.currentIndex];
        const content = document.getElementById('qaContent');
        
        if (!content) return;

        let html = `
            <div class="qa-question">${question.question}</div>
            <div class="qa-answer ${this.answerShown ? 'show' : ''}" id="qaAnswer">
                ${question.answer}
            </div>
            <div class="qa-controls">
        `;

        if (!this.answerShown) {
            html += `<button class="qa-btn show-answer" onclick="QAModule.showAnswer()">答えを見る</button>`;
        } else {
            html += `
                <button class="qa-btn correct" onclick="QAModule.markCorrect()">正解</button>
                <button class="qa-btn wrong" onclick="QAModule.markWrong()">不正解</button>
            `;
        }

        html += '</div>';
        content.innerHTML = html;
    }

    /**
     * 答えを表示
     */
    showAnswer() {
        this.answerShown = true;
        const answerEl = document.getElementById('qaAnswer');
        if (answerEl) {
            answerEl.classList.add('show');
        }
        this.showQuestion();
    }

    /**
     * 正解としてマーク
     */
    markCorrect() {
        this.stats.correct++;
        this.nextQuestion();
    }

    /**
     * 不正解としてマーク
     */
    markWrong() {
        this.stats.wrong++;
        this.nextQuestion();
    }

    /**
     * 次の問題へ
     */
    nextQuestion() {
        this.currentIndex++;
        this.answerShown = false;
        this.updateProgress();
        
        if (this.currentIndex >= this.currentSet.length) {
            this.endSession();
        } else {
            this.showQuestion();
        }
    }

    /**
     * 進捗を更新
     */
    updateProgress() {
        const currentNum = document.getElementById('qaCurrentNum');
        const totalNum = document.getElementById('qaTotalNum');
        const correctCount = document.getElementById('qaCorrectCount');
        const wrongCount = document.getElementById('qaWrongCount');
        const progress = document.getElementById('qaProgress');

        if (currentNum) currentNum.textContent = this.currentIndex + 1;
        if (totalNum) totalNum.textContent = this.stats.total;
        if (correctCount) correctCount.textContent = this.stats.correct;
        if (wrongCount) wrongCount.textContent = this.stats.wrong;
        
        if (progress && this.sessionActive) {
            progress.style.display = 'flex';
        }
    }

    /**
     * セッション終了
     */
    endSession() {
        this.sessionActive = false;
        const content = document.getElementById('qaContent');
        
        if (!content) return;

        const rate = this.stats.total > 0 
            ? Math.round((this.stats.correct / this.stats.total) * 100) 
            : 0;

        content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>結果</h3>
                <div class="stats-grid" style="margin: 20px 0;">
                    <div class="stat-card">
                        <div class="stat-value">${this.stats.correct}</div>
                        <div class="stat-label">正解</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.stats.wrong}</div>
                        <div class="stat-label">不正解</div>
                    </div>
                </div>
                <div style="font-size: 24px; font-weight: 700; color: var(--primary);">
                    正答率: ${rate}%
                </div>
                <button class="save-button" style="margin-top: 20px;" 
                        onclick="location.reload()">終了</button>
            </div>
        `;

        // 進捗を非表示
        const progress = document.getElementById('qaProgress');
        if (progress) {
            progress.style.display = 'none';
        }
    }

    /**
     * 問題を追加
     */
    addQuestion(setName, question, answer) {
        if (!setName || !question || !answer) {
            alert('必要な情報を入力してください');
            return false;
        }

        if (!DataManager.qaQuestions[setName]) {
            DataManager.qaQuestions[setName] = [];
        }

        const newQuestion = {
            id: Date.now(),
            question: question,
            answer: answer
        };

        DataManager.qaQuestions[setName].push(newQuestion);
        DataManager.saveQAQuestions();
        
        return true;
    }

    /**
     * 問題を削除（DataManager連携版）
     */
    deleteQuestion(setName, questionId) {
        if (!confirm('この問題を削除しますか？')) {
            return false;
        }
        if (!DataManager.qaQuestions[setName]) {
            return false;
        }
        
        // ★修正: DataManagerのmarkAsDeletedを使用
        DataManager.markAsDeleted('qa', `${setName}_${questionId}`, {
            setName: setName,
            questionId: questionId
        });
        
        // リストを更新
        const listContent = document.getElementById('qaListContent');
        if (listContent) {
            listContent.innerHTML = this.renderQAList();
        }
        
        // セレクトボックスも更新
        const select = document.getElementById('qaSetSelect');
        if (select) {
            const sets = this.getSetList();
            const currentValue = select.value;
            
            select.innerHTML = '<option value="">問題集を選択</option>';
            sets.forEach(name => {
                const count = this.getQuestions(name).length;
                const option = document.createElement('option');
                option.value = name;
                option.textContent = `${name} (${count}問)`;
                select.appendChild(option);
            });
            
            if (currentValue && sets.includes(currentValue)) {
                select.value = currentValue;
            }
        }
        
        return true;
    }

    /**
     * 問題を編集（改善版：カスタムモーダル）
     */
    editQuestion(setName, questionId) {
        if (!DataManager.qaQuestions[setName]) {
            return false;
        }

        // 該当の問題を探す
        const questions = DataManager.qaQuestions[setName];
        const questionIndex = questions.findIndex(q => q.id === questionId);

        if (questionIndex === -1) {
            alert('問題が見つかりません');
            return false;
        }

        const question = questions[questionIndex];

        // カスタム編集モーダルを表示
        this.showEditModal(setName, questionId, question);
        return true;
    }

    /**
     * 編集モーダルを表示
     */
    showEditModal(setName, questionId, question) {
        // 既存のモーダルがあれば削除
        const existingModal = document.getElementById('qaEditModal');
        if (existingModal) {
            existingModal.remove();
        }

        // モーダルHTML作成
        const modalHTML = `
            <div id="qaEditModal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            ">
                <div style="
                    background: white;
                    width: 90%;
                    max-width: 600px;
                    max-height: 80vh;
                    border-radius: 12px;
                    padding: 24px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    overflow-y: auto;
                ">
                    <h3 style="margin: 0 0 20px 0; font-size: 18px;">問題を編集</h3>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
                            問題文
                        </label>
                        <textarea id="editQuestionText" style="
                            width: 100%;
                            height: 120px;
                            padding: 12px;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            font-size: 14px;
                            font-family: inherit;
                            resize: vertical;
                            box-sizing: border-box;
                        " placeholder="問題文を入力してください">${question.question}</textarea>
                    </div>

                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
                            答え
                        </label>
                        <textarea id="editAnswerText" style="
                            width: 100%;
                            height: 120px;
                            padding: 12px;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            font-size: 14px;
                            font-family: inherit;
                            resize: vertical;
                            box-sizing: border-box;
                        " placeholder="答えを入力してください">${question.answer}</textarea>
                    </div>

                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button onclick="QAModule.closeEditModal()" style="
                            padding: 10px 20px;
                            border: 2px solid #ddd;
                            background: white;
                            color: #666;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                        ">キャンセル</button>
                        <button onclick="QAModule.saveEditedQuestion('${setName}', ${questionId})" style="
                            padding: 10px 20px;
                            border: none;
                            background: #007bff;
                            color: white;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                        ">保存</button>
                    </div>
                </div>
            </div>
        `;

        // モーダルをDOMに追加
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // テキストエリアにフォーカス
        setTimeout(() => {
            const textArea = document.getElementById('editQuestionText');
            if (textArea) {
                textArea.focus();
                textArea.setSelectionRange(textArea.value.length, textArea.value.length);
            }
        }, 100);
    }

    /**
     * 編集モーダルを閉じる
     */
    closeEditModal() {
        const modal = document.getElementById('qaEditModal');
        if (modal) {
            modal.remove();
        }
    }

    /**
     * 編集された問題を保存
     */
    saveEditedQuestion(setName, questionId) {
        const questionText = document.getElementById('editQuestionText')?.value.trim();
        const answerText = document.getElementById('editAnswerText')?.value.trim();

        if (!questionText || !answerText) {
            alert('問題文と答えを入力してください');
            return;
        }

        if (!DataManager.qaQuestions[setName]) {
            alert('問題集が見つかりません');
            return;
        }

        const questions = DataManager.qaQuestions[setName];
        const questionIndex = questions.findIndex(q => q.id === questionId);

        if (questionIndex === -1) {
            alert('問題が見つかりません');
            return;
        }

        // 問題を更新
        questions[questionIndex] = {
            ...questions[questionIndex],
            question: questionText,
            answer: answerText
        };

        DataManager.saveQAQuestions();

        // モーダルを閉じる
        this.closeEditModal();

        // リストを更新
        const listContent = document.getElementById('qaListContent');
        if (listContent) {
            listContent.innerHTML = this.renderQAList();
        }

        alert('問題を更新しました');
    }
    
    /**
     * アコーディオントグル
     */
    toggleAddSection() {
        const section = document.getElementById('addQuestionSection');
        const icon = document.getElementById('accordionIcon');
        
        if (section && icon) {
            if (section.style.display === 'none' || section.style.display === '') {
                section.style.display = 'block';
                icon.textContent = '▼';
            } else {
                section.style.display = 'none';
                icon.textContent = '▶';
            }
        }
    }

    /**
     * CSVからインポート
     */
    importFromCSV(setName, csvData) {
        if (!setName || !csvData) {
            alert('問題集名とCSVデータを入力してください');
            return false;
        }

        try {
            const lines = csvData.trim().split('\n');
            const questions = [];
            
            // ヘッダー行をスキップ
            let startIndex = 0;
            if (lines[0].includes('問題') || lines[0].includes('答え')) {
                startIndex = 1;
            }
            
            for (let i = startIndex; i < lines.length; i++) {
    // ★追加: より堅牢なCSVパース処理
    const parts = this.parseCSVLine(lines[i]);
    if (parts.length >= 2) {
        const question = parts[0]?.trim();
        const answer = parts[1]?.trim();
        
        if (question && answer) {
            questions.push({
                id: Date.now() + i,
                            question: question,
                            answer: answer
                        });
                    }
                }
            }
            
            if (questions.length > 0) {
                if (!DataManager.qaQuestions[setName]) {
                    DataManager.qaQuestions[setName] = [];
                }
                DataManager.qaQuestions[setName].push(...questions);
                DataManager.saveQAQuestions();
                
                alert(`${questions.length}問の問題をインポートしました`);
                return true;
            } else {
                alert('有効な問題が見つかりませんでした');
                return false;
            }
        } catch (error) {
            console.error('QA CSV import error:', error);
            alert('CSVの解析に失敗しました。形式を確認してください。');
            return false;
        }
    }

    /**
     * 問題集リストを取得（削除済み除外版）
     */
    getSetList() {
        const filteredSets = [];
        Object.keys(DataManager.qaQuestions || {}).forEach(setName => {
            if (!DataManager.isDeleted('qaQuestions', setName)) {
                const questions = this.getQuestions(setName);
                if (questions.length > 0) {
                    filteredSets.push(setName);
                }
            }
        });
        return filteredSets;
    }

    /**
     * 問題集の問題を取得（削除済み除外版）
     */
    getQuestions(setName) {
        if (!DataManager.qaQuestions[setName] || DataManager.isDeleted('qaQuestions', setName)) {
            return [];
        }
        
        // ★追加: 削除済み問題をフィルタリング
        return DataManager.qaQuestions[setName].filter(q => 
            !DataManager.isDeletedQAQuestion(setName, q.id)
        );
    }

    /**
     * UIコンテンツを生成
     */
    renderQAContent() {
        const sets = this.getSetList();
        
        let html = `
            <!-- ★順序入れ替え: 問題開始を先に -->
            <div class="qa-card">
                <h4>問題開始</h4>
                <div class="qa-selector">
                    <select id="qaSetSelect">
                        <option value="">問題集を選択</option>
        `;
        
        sets.forEach(setName => {
            const count = this.getQuestions(setName).length;
            html += `<option value="${setName}">${setName} (${count}問)</option>`;
        });
        
        html += `
                    </select>
                    <button onclick="QAModule.handleStart()">開始</button>
                </div>
                
                <div class="qa-progress" id="qaProgress" style="display: none;">
                    <span class="qa-progress-text">
                        問題 <span id="qaCurrentNum">0</span> / <span id="qaTotalNum">0</span>
                    </span>
                    <div class="qa-stats">
                        <span class="qa-stat">
                            正解: <span class="qa-stat-value" id="qaCorrectCount">0</span>
                        </span>
                        <span class="qa-stat">
                            不正解: <span class="qa-stat-value" id="qaWrongCount">0</span>
                        </span>
                    </div>
                </div>
                
                <div id="qaContent"></div>
            </div>
            
            <!-- ★アコーディオン化: 問題を手動追加 -->
            <div class="card" style="margin-top: 20px;">
                <div class="accordion-header" onclick="QAModule.toggleAddSection()" style="cursor: pointer; padding: 10px; background: var(--light); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
                    <h4 style="margin: 0;">問題を手動追加</h4>
                    <span id="accordionIcon">▶</span>
                </div>
                <div id="addQuestionSection" style="display: none; padding-top: 15px;">
                    <div class="form-group">
                        <label class="form-label">問題集名</label>
                        <input type="text" class="form-control" id="qaNewSetName" 
                               placeholder="問題集名">
                    </div>
                    <div class="form-group">
                        <label class="form-label">問題文</label>
                        <textarea class="form-control" id="qaNewQuestion" rows="3" 
                                  placeholder="問題文を入力"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">答え</label>
                        <textarea class="form-control" id="qaNewAnswer" rows="3" 
                                  placeholder="答えを入力"></textarea>
                    </div>
                    <button class="save-button" onclick="QAModule.handleAddQuestion()">
                        問題を追加
                    </button>
                </div>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h4>登録済み問題</h4>
                <div id="qaListContent">${this.renderQAList()}</div>
            </div>
        `;
        
        return html;
    }

    /**
     * 問題リストを生成（削除済み除外版）
     */
    renderQAList() {
        let html = '';
        
        // ★修正: getSetListを使用して削除済み問題集を除外
        this.getSetList().forEach(setName => {
            const questions = this.getQuestions(setName); // ★修正: 削除済み問題も除外
            
            if (questions.length > 0) {
                html += `<h5>${setName} (${questions.length}問)</h5>`;
                
                questions.forEach(q => {
    html += `
        <div class="delete-list-item">
            <div>
                <div style="font-weight: 600; font-size: 14px;">
                    ${q.question}
                </div>
                <div style="font-size: 12px; color: var(--gray); margin-top: 5px;">
                    ${q.answer}
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button onclick="QAModule.editQuestion('${setName}', ${q.id})"
                        style="background: none; border: none; cursor: pointer; font-size: 16px; padding: 2px;">
                    ✏️
                </button>
                <button onclick="QAModule.deleteQuestion('${setName}', ${q.id})"
                        style="background: none; border: none; cursor: pointer; font-size: 16px; padding: 2px;">
                    🗑️
                </button>
            </div>
        </div>
    `;
                });
            }
        });
        
        if (!html) {
            html = '<p style="color: var(--gray); text-align: center;">問題がありません</p>';
        }
        
        return html;
    }

    /**
     * 開始ボタンのハンドラ
     */
    handleStart() {
        const select = document.getElementById('qaSetSelect');
        if (!select || !select.value) {
            alert('問題集を選択してください');
            return;
        }
        
        // DataManager.qaQuestionsが初期化されているか確認
        if (!DataManager.qaQuestions || Object.keys(DataManager.qaQuestions).length === 0) {
            alert('問題が登録されていません。先に問題を追加してください。');
            return;
        }
        
        const questions = this.getQuestions(select.value);
        if (questions.length === 0) {
            alert('選択した問題集に問題がありません。');
            return;
        }
        
        this.startSession(select.value);
    }

    /**
     * 問題追加のハンドラ
     */
    handleAddQuestion() {
        const setNameEl = document.getElementById('qaNewSetName');
        const questionEl = document.getElementById('qaNewQuestion');
        const answerEl = document.getElementById('qaNewAnswer');
        
        if (!setNameEl || !questionEl || !answerEl) {
            console.error('Required elements not found');
            return;
        }
        
        const setName = setNameEl.value.trim() || 'その他';
        const question = questionEl.value.trim();
        const answer = answerEl.value.trim();
        
        if (!question || !answer) {
            alert('問題文と答えを入力してください');
            return;
        }
        
        // DataManager.qaQuestionsが初期化されているか確認
        if (!DataManager.qaQuestions) {
            DataManager.qaQuestions = {};
        }
        
        if (this.addQuestion(setName, question, answer)) {
            // フォームをクリア
            questionEl.value = '';
            answerEl.value = '';
            
            // リストを更新
            const listContent = document.getElementById('qaListContent');
            if (listContent) {
                listContent.innerHTML = this.renderQAList();
            }
            
            // セレクトボックスも更新
            const select = document.getElementById('qaSetSelect');
            if (select) {
                // 新しいセットが追加された場合、セレクトボックスを更新
                const currentValue = select.value;
                const sets = this.getSetList();
                
                select.innerHTML = '<option value="">問題集を選択</option>';
                sets.forEach(name => {
                    const count = this.getQuestions(name).length;
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = `${name} (${count}問)`;
                    select.appendChild(option);
                });
                
                // 元の選択を復元
                if (currentValue) {
                    select.value = currentValue;
                }
            }
            
            alert('問題を追加しました');
        }
    }
}

// グローバルに公開
window.QAModule = new QAModuleClass();

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    QAModule.initialize();
});
