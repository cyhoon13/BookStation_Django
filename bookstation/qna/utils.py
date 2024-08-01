import os
import tensorflow as tf
from transformers import BertTokenizer, TFBertForSequenceClassification

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
    model = TFBertForSequenceClassification.from_pretrained(model_path)  # 내부적으로 소프트맥스 함수를 사용하여 로짓 값을 확률 값으로 변환

    return model

def check_profanity(text):
    tokenizer = load_tokenizer()
    model = load_model()
    
    encodings = tokenizer([text], truncation=True, padding=True, max_length=40)
    dataset = tf.data.Dataset.from_tensor_slices(dict(encodings)).batch(1)

    predictions = model.predict(dataset)

    #예측된 로짓 값을 통해 가장 높은 확률의 라벨을 선택
    predicted_label = tf.argmax(predictions.logits, axis=1).numpy()[0]

    return predicted_label == 1  # 1이면 욕설, 0이면 비욕설