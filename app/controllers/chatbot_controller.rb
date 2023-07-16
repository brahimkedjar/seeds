class ChatbotController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'httparty'

  def reply
    message = params[:message]

    response = make_chatgpt_api_call(message)
    chatbot_reply = response['choices'][0]['message']['content']

    render json: chatbot_reply
  end

  private

  def make_chatgpt_api_call(message)
    url = 'https://api.openai.com/v1/chat/completions'
    headers = {
      'Authorization' => 'Bearer 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',
      'Content-Type' => 'application/json'
    }
    payload = {
      'model' => 'gpt-3.5-turbo',
      'messages' => [
        {
          'role' => 'system',
          'content' => 'You are a chatbot.'
        },
        {
          'role' => 'user',
          'content' => message
        }
      ]
    }

    response = HTTParty.post(url, headers: headers, body: payload.to_json)
    response.parsed_response
  end
end
