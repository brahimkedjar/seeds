class CustomController < ApplicationController
  def redirect_app_image
    send_file Rails.root.join('app', 'javascript', 'img', 'app.png'), type: 'image/png', disposition: 'inline'
  end
end
