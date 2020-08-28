Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get '/dashboard', to: 'pages#dashboard'
  get '/account', to: 'pages#account'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :recipes do
    resources :reviews, only: [:index, :create, :update]
    resources :measures, only: [ :new, :create ]
  end
  resources :reviews, only: [:edit, :destroy]
  resources :favorites, only: [:index, :create, :destroy]
  resources :groceries, only: [:index, :create, :destroy]

  resources :categories, only: [:index, :show]
  resources :ingredients, only: [:index, :show]
  get "api/ingredients", to: "ingredients#create_json"
end
