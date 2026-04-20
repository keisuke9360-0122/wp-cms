# ブログカテゴリ追加 & アフィリエイトサイト構築 設計書

**作成日：** 2026-04-21  
**対象リポジトリ：** portfolio-next

---

## 概要

現在のポートフォリオ（portfolio-next）はWordPressをヘッドレスCMSとして使用しており、全投稿をカテゴリ区別なく表示している。

本設計では：
1. WordPressに「制作事例」「ブログ」カテゴリを明示的に分離する
2. portfolio-nextは「制作事例」カテゴリのみ表示するよう絞り込む
3. WordPressのフロントエンド（Cocoonテーマ）を独自ドメインで公開し、アフィリエイトブログとして運用する

---

## システム構成

```
WordPress（新独自ドメイン / XServer）
├── カテゴリ：制作事例（slug: works）
│   └── GraphQL → portfolio-next（Next.js）に表示
└── カテゴリ：ブログ・その他
    └── WordPressフロントエンド（Cocoonテーマ）に表示
```

---

## 設計①：WordPress側（管理画面のみ・コード不要）

### カテゴリ構成

| カテゴリ名 | スラッグ | 表示先 |
|-----------|---------|--------|
| 制作事例 | `works` | portfolio-next |
| ブログ | `blog` | アフィリエイトサイト（WP） |
| 将来の追加カテゴリ | 任意 | アフィリエイトサイト（WP）に自動反映 |

### 手順

1. `投稿 → カテゴリー` から以下を作成
   - 「制作事例」スラッグ：`works`
   - 「ブログ」スラッグ：`blog`
2. 既存の投稿すべてに「制作事例」カテゴリを付与
3. Cocoonテーマをインストール・有効化
4. 新ドメイン取得（美容業界暴露系コンテンツに合わせたキーワード入りドメイン推奨）
5. XServerのサーバーパネルでドメインを追加
6. XServerで無料SSL（Let's Encrypt）を有効化
7. WP管理画面 `設定 → 一般` でサイトURL・WordPressURLを新ドメイン（https://）に変更

### 将来のカテゴリ追加について

portfolio-nextは「制作事例」カテゴリのみを明示的に取得する設計のため、**WordPressで新カテゴリを追加してもportfolio-nextには影響しない**。新カテゴリの記事はアフィリエイトサイト側に自動的に表示される。コード変更は不要。

---

## 設計②：portfolio-next側（コード変更・2ファイル）

### `src/lib/getPosts.ts`

GraphQLクエリに `categoryName` フィルタを追加し、「制作事例」カテゴリのみ取得する。

> **注意：** `categoryName` の値はWordPressに登録したカテゴリ名と完全一致させる必要がある。WordPress側で「制作事例」というカテゴリ名を設定した場合、クエリも `"制作事例"` と記述する。

```graphql
# 変更後
posts(where: { categoryName: "制作事例" }) {
  nodes {
    id
    title
    slug
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    projectLink {
      projectLink {
        url
      }
    }
  }
}
```

### `src/lib/graphql-client.ts`

エンドポイントURLをHTTPから新ドメインのHTTPSに変更する。

```ts
// 変更後
const endpoint = "https://新ドメイン/graphql";
```

### 影響範囲

| ファイル | 変更後の挙動 |
|---------|------------|
| `src/app/works/page.tsx` | 制作事例のみ表示（意図通り） |
| `src/app/page.tsx`（Web Worksセクション） | 制作事例のみ表示（意図通り） |
| `src/app/blog/page.tsx` | 制作事例のみ表示（実質不要になる可能性あり） |

---

## 設計③：アフィリエイトサイト（WordPressフロントエンド）

### テーマ

**Cocoon**（無料）を推奨
- SEO最適化済み
- アフィリエイト向け機能（目次・関連記事・広告枠）が標準搭載
- 日本語サポートが充実

### ドメイン戦略

- 美容業界暴露・本音系コンテンツのキーワードを含む短いドメインを推奨
- 例：`biyoshi-honne.com`、`salon-urahide.com` など
- 拡張子：`.com` または `.jp`

### コンテンツ戦略

- 美容師10年以上の実体験をベースにした業界の裏話・本音記事
- バズりやすい暴露系コンテンツ → SNS流入 → アフィリエイト収益
- 将来的にカテゴリを増やして多ジャンル展開も可能

---

## 実装順序

1. **WordPress管理画面**でカテゴリを作成・既存投稿に付与
2. **新ドメイン取得** → XServer設定 → SSL有効化 → WP URL変更
3. **Cocoonテーマ適用**・初期設定
4. **portfolio-next** の `getPosts.ts` と `graphql-client.ts` を修正
5. portfolio-nextをビルド・動作確認

---

## 未決事項

- 新ドメイン名（取得前に確定が必要）
- Cocoonのカスタマイズ範囲（デザイン・広告枠配置など）
