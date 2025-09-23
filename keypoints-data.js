/**
 * KeyPoints Data - 行政書士試験要点データ
 * 全ユーザーに配布される標準データセット
 */
const DEFAULT_KEYPOINTS_DATA = {
    subjects: {
        'constitution': {
            name: '第1編 憲法',
            order: 1,
            topics: [
                { title: '憲法と前文', url: '/kenpou/kenpou-zenbun/', difficulty: 'C', type: 'link' },
                { title: '国民主権と象徴天皇', url: '/kenpou/kokumin-shuken/', difficulty: 'B', type: 'link' },
                { title: '人権総論', url: '/kenpou/jinken-souron/', difficulty: 'B', type: 'link' },
                { title: '法の下の平等', url: '/kenpou/hou-no-shita-byoudou/', difficulty: 'A', type: 'link' },
                { title: '幸福追求権', url: '/kenpou/koufuku-tsuikyuuken/', difficulty: 'A', type: 'link' },
                { title: '思想・信教の自由', url: '/kenpou/shisou-shinkyou/', difficulty: 'A', type: 'link' },
                { title: '表現の自由(1)', url: '/kenpou/hyougen-1/', difficulty: 'A', type: 'link' },
                { title: '表現の自由(2)', url: '/kenpou/hyougen-2/', difficulty: 'A', type: 'link' },
                { title: '表現の自由(3)', url: '/kenpou/hyougen-3/', difficulty: 'A', type: 'link' },
                { title: '学問の自由と教育を受ける権利', url: '/kenpou/gakumon-kyouiku/', difficulty: 'B', type: 'link' },
                { title: '経済的自由・人身の自由', url: '/kenpou/keizaiteki-jinshin/', difficulty: 'A', type: 'link' },
                { title: '生存権と労働基本権', url: '/kenpou/seizonken-roudou/', difficulty: 'A', type: 'link' },
                { title: '代表民主制と参政権', url: '/kenpou/daihyou-minshu/', difficulty: 'B', type: 'link' },
                { title: '国会(1)', url: '/kenpou/kokkai-1/', difficulty: 'B', type: 'link' },
                { title: '国会(2)', url: '/kenpou/kokkai-2/', difficulty: 'B', type: 'link' },
                { title: '内閣(1)', url: '/kenpou/naikaku-1/', difficulty: 'B', type: 'link' },
                { title: '内閣(2)', url: '/kenpou/naikaku-2/', difficulty: 'B', type: 'link' },
                { title: '司法権', url: '/kenpou/shihouken/', difficulty: 'B', type: 'link' },
                { title: '裁判官', url: '/kenpou/saibakan/', difficulty: 'B', type: 'link' },
                { title: '憲法訴訟', url: '/kenpou/kenpou-soshou/', difficulty: 'A', type: 'link' },
                { title: '地方自治', url: '/kenpou/chihou-jichi/', difficulty: 'B', type: 'link' },
                { title: '憲法改正・最高法規', url: '/kenpou/kaisei-saikou/', difficulty: 'C', type: 'link' }
            ]
        },
        'administrative': {
            name: '第2編 行政法',
            order: 2,
            topics: [
                { title: '法治主義・法の支配', url: '/gyousei/houchi-shugi/', difficulty: 'B', type: 'link' },
                { title: '権力分立と法律による行政', url: '/gyousei/kenryoku-bunritsu/', difficulty: 'B', type: 'link' },
                { title: '行政組織法', url: '/gyousei/gyousei-soshiki/', difficulty: 'B', type: 'link' },
                { title: '公務員法(1)', url: '/gyousei/koumuin-1/', difficulty: 'A', type: 'link' },
                { title: '公務員法(2)', url: '/gyousei/koumuin-2/', difficulty: 'A', type: 'link' },
                { title: '行政行為総論(1)', url: '/gyousei/gyousei-koui-1/', difficulty: 'A', type: 'link' },
                { title: '行政行為総論(2)', url: '/gyousei/gyousei-koui-2/', difficulty: 'A', type: 'link' },
                { title: '行政行為の効力', url: '/gyousei/koui-kouryoku/', difficulty: 'A', type: 'link' },
                { title: '行政行為の瑕疵', url: '/gyousei/koui-kashi/', difficulty: 'A', type: 'link' },
                { title: '行政行為の取消・撤回', url: '/gyousei/torikeshi-tekkai/', difficulty: 'A', type: 'link' },
                { title: '行政指導', url: '/gyousei/gyousei-shidou/', difficulty: 'A', type: 'link' },
                { title: '行政契約', url: '/gyousei/gyousei-keiyaku/', difficulty: 'B', type: 'link' },
                { title: '行政調査', url: '/gyousei/gyousei-chousa/', difficulty: 'B', type: 'link' },
                { title: '行政計画', url: '/gyousei/gyousei-keikaku/', difficulty: 'C', type: 'link' },
                { title: '行政手続法(1)', url: '/gyousei/gyousei-tetsuduki-1/', difficulty: 'A', type: 'link' },
                { title: '行政手続法(2)', url: '/gyousei/gyousei-tetsuduki-2/', difficulty: 'A', type: 'link' },
                { title: '行政不服審査法(1)', url: '/gyousei/fufuku-shinsa-1/', difficulty: 'A', type: 'link' },
                { title: '行政不服審査法(2)', url: '/gyousei/fufuku-shinsa-2/', difficulty: 'A', type: 'link' },
                { title: '行政事件訴訟法(1)', url: '/gyousei/jiken-soshou-1/', difficulty: 'A', type: 'link' },
                { title: '行政事件訴訟法(2)', url: '/gyousei/jiken-soshou-2/', difficulty: 'A', type: 'link' },
                { title: '行政事件訴訟法(3)', url: '/gyousei/jiken-soshou-3/', difficulty: 'A', type: 'link' },
                { title: '行政事件訴訟法(4)', url: '/gyousei/jiken-soshou-4/', difficulty: 'A', type: 'link' },
                { title: '国家賠償法(1)', url: '/gyousei/kokka-baishou-1/', difficulty: 'A', type: 'link' },
                { title: '国家賠償法(2)', url: '/gyousei/kokka-baishou-2/', difficulty: 'A', type: 'link' },
                { title: '損失補償', url: '/gyousei/sonshitsu-hoshou/', difficulty: 'A', type: 'link' },
                { title: '情報公開法・個人情報保護法', url: '/gyousei/jouhou-kokai/', difficulty: 'B', type: 'link' }
            ]
        },
        'civil': {
            name: '第3編 民法',
            order: 3,
            topics: [
                { title: '私権の享有', url: '/minpou/shikennokyouyuu/', difficulty: 'B', type: 'link' },
                { title: '権利能力', url: '/minpou/kenrinouuryoku/', difficulty: 'B', type: 'link' },
                { title: '意思能力', url: '/minpou/ishimouuryoku/', difficulty: 'A', type: 'link' },
                { title: '行為能力(1)', url: '/minpou/kouinouuryoku1/', difficulty: 'A', type: 'link' },
                { title: '行為能力(2)', url: '/minpou/kouinouuryoku2/', difficulty: 'A', type: 'link' },
                { title: '住所・不在者の財産管理', url: '/minpou/juusho/', difficulty: 'B', type: 'link' },
                { title: '失踪宣告', url: '/minpou/shissousenkoku/', difficulty: 'A', type: 'link' },
                { title: '同時死亡の推定', url: '/minpou/doujishibou/', difficulty: 'B', type: 'link' },
                { title: '法人(1)', url: '/minpou/houjin1/', difficulty: 'B', type: 'link' },
                { title: '法人(2)', url: '/minpou/houjin2/', difficulty: 'B', type: 'link' },
                { title: '物・所有権', url: '/minpou/butsu/', difficulty: 'A', type: 'link' },
                { title: '所有権の内容・相隣関係', url: '/minpou/shoyuuken/', difficulty: 'A', type: 'link' },
                { title: '共有・区分所有', url: '/minpou/kyouyuu/', difficulty: 'A', type: 'link' },
                { title: '用益物権総論', url: '/minpou/youekibutsuken/', difficulty: 'B', type: 'link' },
                { title: '地上権・永小作権', url: '/minpou/chijouken/', difficulty: 'B', type: 'link' },
                { title: '地役権', url: '/minpou/chieki/', difficulty: 'B', type: 'link' },
                { title: '担保物権総論', url: '/minpou/tanpo/', difficulty: 'A', type: 'link' },
                { title: '留置権', url: '/minpou/ryuuchiken/', difficulty: 'A', type: 'link' },
                { title: '先取特権', url: '/minpou/senshutokuken/', difficulty: 'A', type: 'link' },
                { title: '質権', url: '/minpou/shichiken/', difficulty: 'B', type: 'link' },
                { title: '抵当権(1)', url: '/minpou/teitouken1/', difficulty: 'A', type: 'link' },
                { title: '抵当権(2)', url: '/minpou/teitouken2/', difficulty: 'A', type: 'link' },
                { title: '抵当権(3)', url: '/minpou/teitouken3/', difficulty: 'A', type: 'link' },
                { title: '根抵当権', url: '/minpou/neteitouken/', difficulty: 'A', type: 'link' },
                { title: '譲渡担保・非典型担保', url: '/minpou/joutotanpo/', difficulty: 'B', type: 'link' },
                { title: '債権の目的・効力', url: '/minpou/saikenno/', difficulty: 'A', type: 'link' },
                { title: '債務不履行(1)', url: '/minpou/saimufurikou1/', difficulty: 'A', type: 'link' },
                { title: '債務不履行(2)', url: '/minpou/saimufurikou2/', difficulty: 'A', type: 'link' },
                { title: '受領遅滞', url: '/minpou/juryouchitai/', difficulty: 'B', type: 'link' },
                { title: '第三者による債権侵害', url: '/minpou/daisansha/', difficulty: 'B', type: 'link' },
                { title: '多数当事者の債権債務(1)', url: '/minpou/tasuutouji1/', difficulty: 'A', type: 'link' },
                { title: '多数当事者の債権債務(2)', url: '/minpou/tasuutouji2/', difficulty: 'A', type: 'link' },
                { title: '保証債務(1)', url: '/minpou/hoshou1/', difficulty: 'A', type: 'link' },
                { title: '保証債務(2)', url: '/minpou/hoshou2/', difficulty: 'A', type: 'link' },
                { title: '債権譲渡(1)', url: '/minpou/saikenjout1/', difficulty: 'A', type: 'link' },
                { title: '債権譲渡(2)', url: '/minpou/saikenjout2/', difficulty: 'A', type: 'link' },
                { title: '債務引受・契約上の地位の移転', url: '/minpou/saimuhikiu/', difficulty: 'B', type: 'link' },
                { title: '債権の消滅(1)', url: '/minpou/saikenshou1/', difficulty: 'A', type: 'link' },
                { title: '債権の消滅(2)', url: '/minpou/saikenshou2/', difficulty: 'A', type: 'link' },
                { title: '契約総論(1)', url: '/minpou/keiyakusou1/', difficulty: 'A', type: 'link' },
                { title: '契約総論(2)', url: '/minpou/keiyakusou2/', difficulty: 'A', type: 'link' },
                { title: '契約総論(3)', url: '/minpou/keiyakusou3/', difficulty: 'A', type: 'link' },
                { title: '売買(1)', url: '/minpou/baibai1/', difficulty: 'A', type: 'link' },
                { title: '売買(2)', url: '/minpou/baibai2/', difficulty: 'A', type: 'link' },
                { title: '売買(3)', url: '/minpou/baibai3/', difficulty: 'A', type: 'link' },
                { title: '贈与', url: '/minpou/zouyo/', difficulty: 'B', type: 'link' },
                { title: '貸借型契約(1)', url: '/minpou/taishaku1/', difficulty: 'A', type: 'link' },
                { title: '貸借型契約(2)', url: '/minpou/taishaku2/', difficulty: 'A', type: 'link' },
                { title: '雇用・請負・委任', url: '/minpou/kouyou/', difficulty: 'A', type: 'link' },
                { title: '事務管理・不当利得', url: '/minpou/jimukanri/', difficulty: 'A', type: 'link' },
                { title: '不法行為(1)', url: '/minpou/fuhoukoui1/', difficulty: 'A', type: 'link' },
                { title: '不法行為(2)', url: '/minpou/fuhoukoui2/', difficulty: 'A', type: 'link' },
                { title: '不法行為(3)', url: '/minpou/fuhoukoui3/', difficulty: 'A', type: 'link' },
                { title: '親族(1)', url: '/minpou/shinzoku1/', difficulty: 'A', type: 'link' },
                { title: '親族(2)', url: '/minpou/shinzoku2/', difficulty: 'A', type: 'link' },
                { title: '相続(1)', url: '/minpou/souzoku1/', difficulty: 'A', type: 'link' },
                { title: '相続(2)', url: '/minpou/souzoku2/', difficulty: 'A', type: 'link' },
                { title: '相続(3)', url: '/minpou/souzoku3/', difficulty: 'A', type: 'link' }
            ]
        },
        'commercial': {
            name: '第4編 商法・会社法',
            order: 4,
            topics: [
                { title: '商法総則(1)', url: '/shouhou/sousoku1/', difficulty: 'B', type: 'link' },
                { title: '商法総則(2)', url: '/shouhou/sousoku2/', difficulty: 'B', type: 'link' },
                { title: '商行為法(1)', url: '/shouhou/shoukoui1/', difficulty: 'B', type: 'link' },
                { title: '商行為法(2)', url: '/shouhou/shoukoui2/', difficulty: 'B', type: 'link' },
                { title: '会社法総則', url: '/shouhou/kaishahousoku/', difficulty: 'A', type: 'link' },
                { title: '株式(1)', url: '/shouhou/kabushiki1/', difficulty: 'A', type: 'link' },
                { title: '株式(2)', url: '/shouhou/kabushiki2/', difficulty: 'A', type: 'link' },
                { title: '機関総論', url: '/shouhou/kikansouron/', difficulty: 'A', type: 'link' },
                { title: '株主総会', url: '/shouhou/kabunushisokai/', difficulty: 'A', type: 'link' },
                { title: '取締役・取締役会', url: '/shouhou/torishimari/', difficulty: 'A', type: 'link' },
                { title: '代表取締役', url: '/shouhou/daihyou/', difficulty: 'A', type: 'link' },
                { title: '監査役・会計参与', url: '/shouhou/kansayaku/', difficulty: 'B', type: 'link' },
                { title: '計算', url: '/shouhou/keisan/', difficulty: 'B', type: 'link' },
                { title: '募集株式の発行', url: '/shouhou/boshuu/', difficulty: 'A', type: 'link' },
                { title: '新株予約権', url: '/shouhou/shinkabuyoyaku/', difficulty: 'B', type: 'link' },
                { title: '組織変更・合併', url: '/shouhou/soshiki/', difficulty: 'B', type: 'link' },
                { title: '会社の解散・清算', url: '/shouhou/kaisan/', difficulty: 'B', type: 'link' },
                { title: '持分会社', url: '/shouhou/mochibun/', difficulty: 'C', type: 'link' }
            ]
        },
        'basic_law': {
            name: '第5編 基礎法学',
            order: 5,
            topics: [
                { title: '法の概念', url: '/kiso/hounogannen/', difficulty: 'B', type: 'link' },
                { title: '法の分類', url: '/kiso/hounobunrui/', difficulty: 'B', type: 'link' },
                { title: '法の効力', url: '/kiso/hounokouryoku/', difficulty: 'B', type: 'link' },
                { title: '法の適用・解釈', url: '/kiso/hounotekyou/', difficulty: 'B', type: 'link' },
                { title: '法と道徳', url: '/kiso/houtodoutoku/', difficulty: 'C', type: 'link' },
                { title: '権利と義務', url: '/kiso/kenritogimu/', difficulty: 'B', type: 'link' },
                { title: '法律関係', url: '/kiso/houritsu/', difficulty: 'B', type: 'link' },
                { title: '法学の基礎', url: '/kiso/hougaku/', difficulty: 'C', type: 'link' }
            ]
        }
    },

    // デフォルト要点テンプレート
    templates: {
        'keypoint': {
            name: '重要ポイント',
            fields: [
                { name: 'title', label: 'タイトル', type: 'text', required: true },
                { name: 'content', label: '内容', type: 'textarea', required: true },
                { name: 'importance', label: '重要度', type: 'select', options: ['A', 'B', 'C'], required: true }
            ]
        },
        'formula': {
            name: '重要条文・判例',
            fields: [
                { name: 'law', label: '法律名', type: 'text', required: true },
                { name: 'article', label: '条文番号', type: 'text', required: false },
                { name: 'content', label: '条文内容', type: 'textarea', required: true },
                { name: 'note', label: '注意点', type: 'textarea', required: false }
            ]
        },
        'case': {
            name: '判例',
            fields: [
                { name: 'court', label: '裁判所', type: 'text', required: true },
                { name: 'date', label: '判決日', type: 'date', required: false },
                { name: 'summary', label: '事案の概要', type: 'textarea', required: true },
                { name: 'holding', label: '判旨', type: 'textarea', required: true }
            ]
        }
    }
};

// グローバル変数として設定
window.DEFAULT_KEYPOINTS_DATA = DEFAULT_KEYPOINTS_DATA;