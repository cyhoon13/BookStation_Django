import os
import tensorflow as tf
from transformers import BertTokenizer, TFBertForSequenceClassification
import logging

def load_tokenizer():
    # 경로 수정
    tokenizer_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'bert_tokenizer')

    # 토크나이저 로드
    tokenizer = BertTokenizer.from_pretrained(tokenizer_path)

    return tokenizer

def load_model():
    # 경로 수정
    model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'bert_model')

    # 모델 로드
    model = TFBertForSequenceClassification.from_pretrained(model_path)

    return model

logger = logging.getLogger(__name__)

def check_profanity(text):
    tokenizer = load_tokenizer()
    model = load_model()
    
    encodings = tokenizer([text], truncation=True, padding=True, max_length=128)
    dataset = tf.data.Dataset.from_tensor_slices(dict(encodings)).batch(1)
    
    logger.debug(f"Encoded text for profanity check: {encodings}")

    predictions = model.predict(dataset)
    predicted_label = tf.argmax(predictions.logits, axis=1).numpy()[0]
    
    logger.debug(f"Prediction result: {predicted_label}")

    return predicted_label == 1  # 1이면 욕설, 0이면 비욕설