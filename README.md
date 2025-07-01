# 🎙️ EmotionCast – Emotion-Aware Text-to-Speech & Speech-to-Text API

EmotionCast is a full-stack AWS-powered application that converts text to emotionally expressive audio, and vice versa. It uses AI-driven sentiment analysis to generate speech matching the emotion of the input text, or transcribes audio back to text with sentiment detection. This project showcases industry-level authentication, secure API deployment, and modern frontend integration.

## 🌟 Features

✅ **Text ➔ Emotion ➔ Audio**
- Analyze input text with AWS Comprehend to detect sentiment
- Generate speech with Amazon Polly using SSML to express the detected emotion

✅ **Speech ➔ Text ➔ Emotion**
- Upload recorded voice
- Transcribe speech to text with Amazon Transcribe
- Detect sentiment of spoken words

✅ **Secure APIs**
- Lambda functions deployed behind API Gateway
- JWT authentication ready via AWS Cognito

✅ **Frontend Integration**
- React-based interface to submit text, receive audio, and play it back
- Handles real-time audio generation with detected sentiment display

✅ **Deployment**
- Backend fully serverless on AWS (Lambda + API Gateway)
- Frontend ready to deploy with AWS Amplify, S3 + CloudFront, Vercel, or Netlify

## 🔧 Tech Stack

- **AWS Lambda**: Serverless compute for text/speech processing
- **Amazon Polly**: Emotion-aware speech synthesis (TTS)
- **Amazon Comprehend**: Sentiment analysis
- **Amazon Transcribe** (planned): Speech recognition (STT)
- **AWS API Gateway**: Expose Lambda functions securely over HTTPS
- **AWS Cognito** (optional): User authentication with JWT
- **React.js**: Frontend application
- **S3**: Storage for audio files if needed
- **Tailwind CSS**: UI styling

## 🚀 How It Works

1️⃣ **Text-to-Speech Flow**: 
 User ➔ React Frontend ➔ POST /sentiment ➔ Lambda ➔ Comprehend ➔ Polly ➔ Return audio

2️⃣ **Speech-to-Text Flow**: 
 User ➔ Upload audio ➔ S3 ➔ Lambda ➔ Transcribe ➔ Comprehend ➔ Return text + sentiment
