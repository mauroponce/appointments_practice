class TestJob < ApplicationJob
  queue_as :default

  def perform(message)
    Rails.logger.info "Sidekiq test: #{message}"
  end
end
