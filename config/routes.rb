Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :appointments, only: %i[index show create update] do
        collection do
          get :form_data
        end
      end
    end
  end
end
