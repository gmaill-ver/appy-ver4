/**
 * Core Application - 簡素化されたメインアプリケーション
 */
class StudyTracker {
    constructor() {
        this.currentBook = null;
        this.currentPath = [];
        this.questionStates = {};
        this.bookmarkMode = false;
        this.initialized = false;

        // モジュール管理
        this.modules = {
            data: null,
            ui: null,
            timer: null,
            analytics: null,
            keypoints: null,
            qa: null
        };
    }

    /**
     * アプリケーション初期化（簡素化版）
     */
    async initialize() {
        if (this.initialized) return true;

        try {
            console.log('🚀 StudyTracker初期化開始...');

            // 基本設定の読み込み
            await this.loadConfiguration();

            // データ管理の初期化
            await this.initializeDataModule();

            // UI初期化
            await this.initializeUI();

            // 要点データの配布
            await this.distributeKeyPoints();

            // イベントリスナー設定
            this.setupEventListeners();

            this.initialized = true;
            console.log('✅ StudyTracker初期化完了');
            return true;

        } catch (error) {
            console.error('❌ 初期化失敗:', error);
            this.showError('アプリケーションの初期化に失敗しました');
            return false;
        }
    }

    /**
     * 基本設定の読み込み
     */
    async loadConfiguration() {
        // デフォルト設定
        this.config = {
            examDate: localStorage.getItem('examDate') || null,
            theme: localStorage.getItem('theme') || 'light',
            notifications: localStorage.getItem('notifications') !== 'false'
        };
    }

    /**
     * データモジュール初期化（簡素化）
     */
    async initializeDataModule() {
        // localStorage ベースのシンプルなデータ管理
        this.data = {
            books: JSON.parse(localStorage.getItem('studyTracker_books') || '{}'),
            records: JSON.parse(localStorage.getItem('studyTracker_records') || '[]'),
            keypoints: JSON.parse(localStorage.getItem('studyTracker_keypoints') || '{}'),
            progress: JSON.parse(localStorage.getItem('studyTracker_progress') || '{}')
        };
    }

    /**
     * UI初期化
     */
    async initializeUI() {
        // メインタブの初期化
        this.initializeTabs();

        // カレンダーの初期化
        this.initializeCalendar();

        // 試験日カウントダウンの初期化
        this.initializeCountdown();

        // 問題集カードの表示
        this.renderBookCards();
    }

    /**
     * 要点データの配布
     */
    async distributeKeyPoints() {
        console.log('📚 要点データを配布中...');

        // デフォルト要点データがない場合は配布
        if (!this.data.keypoints || Object.keys(this.data.keypoints).length === 0) {
            if (typeof DEFAULT_KEYPOINTS_DATA !== 'undefined') {
                this.data.keypoints = DEFAULT_KEYPOINTS_DATA;
                localStorage.setItem('studyTracker_keypoints', JSON.stringify(this.data.keypoints));
                console.log('✅ デフォルト要点データを配布しました');
            }
        }
    }

    /**
     * エラーハンドリング（改善版）
     */
    showError(message, details = null) {
        console.error('Error:', message, details);

        // ユーザーフレンドリーなエラー表示
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-message">${message}</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;

        document.body.appendChild(errorDiv);

        // 5秒後に自動削除
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    /**
     * データ保存（統一メソッド）
     */
    saveData(key, data) {
        try {
            this.data[key] = data;
            localStorage.setItem(`studyTracker_${key}`, JSON.stringify(data));
            return true;
        } catch (error) {
            this.showError('データの保存に失敗しました', error);
            return false;
        }
    }

    /**
     * メインタブ切り替え
     */
    switchMainTab(tabName, event) {
        try {
            // 全てのタブを非表示
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });

            // 全てのタブボタンを非アクティブ
            document.querySelectorAll('.main-tab').forEach(btn => {
                btn.classList.remove('active');
            });

            // 選択されたタブを表示
            const targetTab = document.getElementById(`${tabName}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // タブボタンをアクティブに
            if (event && event.target) {
                event.target.classList.add('active');
            }

            // タブ固有の初期化処理
            this.handleTabSwitch(tabName);

        } catch (error) {
            this.showError('タブの切り替えに失敗しました', error);
        }
    }

    /**
     * タブ切り替え時の処理
     */
    handleTabSwitch(tabName) {
        switch (tabName) {
            case 'analysis':
                this.loadAnalysisData();
                break;
            case 'progress':
                this.loadProgressData();
                break;
            case 'record':
                this.loadRecordData();
                break;
        }
    }

    /**
     * 問題集カードの描画
     */
    renderBookCards() {
        const container = document.getElementById('bookCardsContainer');
        if (!container) return;

        container.innerHTML = '';

        const books = this.data.books;
        if (!books || Object.keys(books).length === 0) {
            container.innerHTML = '<p class="no-books">問題集が登録されていません</p>';
            return;
        }

        Object.keys(books).forEach(bookId => {
            const book = books[bookId];
            const card = this.createBookCard(book, bookId);
            container.appendChild(card);
        });
    }

    /**
     * 問題集カードの作成
     */
    createBookCard(book, bookId) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.onclick = () => this.selectBook(bookId);

        card.innerHTML = `
            <div class="book-card-header">
                <h3>${book.name || 'Unknown Book'}</h3>
                <span class="book-type">${book.type || ''}</span>
            </div>
            <div class="book-stats">
                <span>問題数: ${book.totalQuestions || 0}</span>
            </div>
        `;

        return card;
    }

    /**
     * イベントリスナーの設定
     */
    setupEventListeners() {
        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.quickSave();
            }
        });

        // オンライン/オフライン検知
        window.addEventListener('online', () => {
            console.log('オンラインに復帰しました');
        });

        window.addEventListener('offline', () => {
            console.log('オフラインになりました');
        });

        // エラーハンドリング
        window.addEventListener('error', (e) => {
            this.showError('予期しないエラーが発生しました', e.error);
        });
    }

    /**
     * クイック保存
     */
    quickSave() {
        try {
            // 現在の状態を全て保存
            Object.keys(this.data).forEach(key => {
                localStorage.setItem(`studyTracker_${key}`, JSON.stringify(this.data[key]));
            });

            this.showSuccess('データを保存しました');
        } catch (error) {
            this.showError('保存に失敗しました', error);
        }
    }

    /**
     * 成功メッセージ表示
     */
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✅</span>
                <span class="success-message">${message}</span>
            </div>
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 3000);
    }
}

// グローバル変数として設定
window.App = new StudyTracker();

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', async () => {
    await App.initialize();
});