# **日本語LLMチャットシステムelyza-node-chat_v2の新しいUIの提供**

本リポジトリでは、日本語LLMを利用したチャットシステム[elyza-node-chat_v2](https://github.com/MO-HU-P/elyza-node-chat_v2)に新しいUIを提供します。  
以前のelyza-node-chat_v2では、Node.jsとExpressでサーバーを構築し、UIはHTMLとCSSで実装されていましたが、  
本リポジトリでは、**Vite**を活用し、**React、TypeScript、Tailwind CSS**を組み合わせて、シンプルでモダンなUIを新たに構築しています。

![Fig](Fig.jpg)

---

## **設定とファイル構成**

本リポジトリにはUIに必要なファイルのみが含まれています。  
Pythonバックエンド部分は既存の「elyza-node-chat_v2」をそのまま利用します。

### **変更内容**
- **以下のファイルやフォルダを削除**:
  ```plaintext
  public/（index.html, style.css）
  server.js
  package.json, package-lock.json
  ```

- **本リポジトリの新しいファイルをルートディレクトリに配置**:
  ```plaintext
  eslint.config.js
  index.html
  package.json, package-lock.json
  postcss.config.js
  tailwind.config.js
  tsconfig.*.json
  vite.config.ts
  src/（UI関連のReactコンポーネントやTypeScriptコード）
  ```

---

## **アプリケーションの起動手順**

**既存と同様に以下の手順で起動します：**

### **1. Node.jsモジュールのインストール**
#### **既存モジュールの削除（推奨）**  
既存の`node_modules`ディレクトリや`package-lock.json`を削除してから`npm install`を実行します。  
以下のコマンドを使用してください：
```bash
# Windows:
rd /s /q node_modules
del package-lock.json

# Linux/macOS:
rm -rf node_modules package-lock.json
```

#### **直接`npm install`を実行する場合**  
すでに整合性の取れた環境であれば、削除せずそのまま`npm install`を実行しても問題ありません。

---

### **2. ターミナルで以下を実行**
- **① Ollamaサーバー起動**
  ```bash
  ollama run elyza:jp8b
  ```

- **② Pythonバックエンド起動**
  ```bash
  python app.py
  ```
  ※終了時は`CTRL+C`

- **③ Node.jsフロントエンド起動**
  ```bash
  npm run dev
  ```
  ※終了時は`CTRL+C`

### **3. ブラウザで以下にアクセス**
```plaintext
http://localhost:5173/
```

---

## **ディレクトリ構造**

以下は新しいUI導入後のプロジェクト構成です:

```
project_root/
│  app.py                        # Pythonバックエンド
│  eslint.config.js*             # ESLintの設定ファイル（コード品質管理）
│  index.html*                   # エントリーポイントのHTMLファイル
│  Llama-3-ELYZA-JP-8B-q4_k_m.gguf # モデルファイル（日本語LLM）
│  Modelfile                     # モデルの設定ファイル
│  package-lock.json*            # npmの依存関係ロックファイル
│  package.json*                 # npm依存関係とスクリプト設定
│  postcss.config.js*            # PostCSSの設定ファイル
│  server.js*                    # Node.jsサーバースクリプト
│  tailwind.config.js*           # Tailwind CSSの設定ファイル
│  tsconfig.app.json*            # TypeScriptアプリケーション設定
│  tsconfig.json*                # TypeScript全体の設定
│  tsconfig.node.json*           # Node.js用のTypeScript設定
│  vite.config.ts*               # Viteの設定ファイル（ビルドツール）
│
├─modules                        # バックエンド機能モジュール
│  │  ContextQA.py               # 質問応答処理（デフォルト）
│  │  ContextQA_ContextualRetrieval.py # コンテキストベースの応答処理（オプション機能）
│  │  DocLoader.py               # ドキュメントローダー
│  │  Summarize.py               # 要約機能（デフォルト）
│  │  Summarize_MapReduce.py     # MapReduce形式の要約（オプション機能）
│  │  TaskHandler.py             # タスク管理
│  │  WebSearch.py               # ウェブ検索機能
│
├─src                            # フロントエンド関連
│  │  api.ts*                    # API通信処理（フロントエンドとバックエンドの接続）
│  │  App.tsx*                   # メインのReactアプリ
│  │  index.css*                 # グローバルCSS（スタイル設定）
│  │  main.tsx*                  # Reactのエントリーポイント
│  │  types.ts*                  # 型定義ファイル（TypeScript用）
│  │  vite-env.d.ts*             # Vite環境用型定義
│  │
│  └─components                  # 再利用可能なReactコンポーネント
│          ChatInput.tsx*        # チャット入力コンポーネント
│          ChatMessage.tsx*      # チャットメッセージ表示コンポーネント
│
└─uploads                        # アップロードされた文書ファイルの一時保存用ディレクトリ

```
- `*`が付いているファイルは、UI刷新に伴って新たに追加または更新されたファイルです。
- modulesディレクトリには、バックエンド機能に関連するコードが格納されています。各モジュールは独立してカスタマイズ可能で、特定の処理を追加する際に便利です。
---

必要に応じて、さらなる情報や詳細については以前のリポジトリ[elyza-node-chat_v1](https://github.com/MO-HU-P/elyza-node-chat)、[elyza-node-chat_v2](https://github.com/MO-HU-P/elyza-node-chat_v2)をご参照ください。


