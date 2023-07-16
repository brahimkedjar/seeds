# db/seed_runner.rb
require_relative '../config/environment'

puts 'Running seeds...'
load Rails.root.join('db', 'seeds.rb')
puts 'Seeding completed.'
