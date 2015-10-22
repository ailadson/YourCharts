Rails.application.routes.draw do
  root 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :data_sources, only: [:index, :create, :update, :destroy]
    resources :chart_metrics, only: [:index, :create, :update, :destroy]
    resources :data_tables, only: [:create]
    post 'query', to: 'data_tables#query'
  end

end
