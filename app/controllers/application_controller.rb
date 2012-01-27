class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def marine_park_map
    render :template => "layouts/marine_park_map", :layout => nil
  end
end
