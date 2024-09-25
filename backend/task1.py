from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from pinecone import Pinecone, ServerlessSpec
from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone as pd
from langchain.chat_models import ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain._api.deprecation import LangChainDeprecationWarning
import warnings

warnings.filterwarnings("ignore", category=LangChainDeprecationWarning)

# load_dotenv()  # Load environment variables at the start
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
global index

def init_app_resources():
    documents = read_documents("documents")
    documents = chunk_data(documents)
    embeddings = OpenAIEmbeddings(api_key="sk-proj-X9TfI7Swg34MCodIeVIXT3BlbkFJFmgt5EvyDI60UJMRwsC6", model="text-embedding-3-small")
    PINECONE_API_KEY = "cda93ecf-8360-4f0c-bf64-9d33acf95509"
    os.environ['PINECONE_API_KEY'] = PINECONE_API_KEY

    # Initialize Pinecone with the API key
    pc = Pinecone(api_key=os.environ['PINECONE_API_KEY'])


    index = pd.from_documents(documents, embeddings, index_name='langchainindex')
    # index = pd.from_existing_index('langchainindex', embeddings)
    return index, embeddings

@app.route('/forum', methods=["POST"])
def handle_forum_request():
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"error": "No question provided"}), 400

    question = data['question']
    llm = ChatOpenAI()
    chain = load_qa_chain(llm, chain_type="stuff")

    try:
        answer = retrieve_answers(question, index, chain)
        return jsonify({
            "answer": answer,
            "incoming": False
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def read_documents(directory):
    file_loader = PyPDFDirectoryLoader(directory)
    return file_loader.load()

def chunk_data(docs, chunk_size=500, chunk_overlap=50):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return text_splitter.split_documents(docs)

def retrieve_answers(query, index, chain):
    doc_search = retrieve_query(query, index)
    return chain.run(input_documents=doc_search, question=query)

def retrieve_query(query, index, k=4):
    return index.similarity_search(query, k=k)

if __name__ == "__main__":
    index, embeddings = init_app_resources()
    app.run(host="0.0.0.0", port=5004, debug=True) 

    





