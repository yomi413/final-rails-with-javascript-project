Rails.application.routes.draw do
  resources :parking_spaces
  resources :users, only: [:new, :create, :show]
  resources :cars, only: [:index, :new, :create, :show, :edit, :update, :destroy]

  # resources :users do
  #   resources :cars, only: [:new, :index, :show]
  # end

  root "welcome#home"

  get '/session', to: 'sessions#new'
  post '/session', to: 'sessions#login', as: 'login'
  delete '/session', to: 'sessions#destroy'

  get '/auth/google_oauth2/callback', to: 'sessions#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
