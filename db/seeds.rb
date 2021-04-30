# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Destroying existing tables to prevent duplicates when reseeding
Organization.destroy_all
Shift.destroy_all
User.destroy_all

#seeding organizations:

@bob = Organization.create!(name: "Bob's Burgers", hourly_rate: 10.00)
@moe = Organization.create!(name: "Moe's Tavern", hourly_rate: 8.75)
@sally = Organization.create!(name: "Sally's Sandwiches", hourly_rate: 11.00)

puts " #{Organization.count} organizations created"

#seeding user:

@will = User.create!(organization: @bob, name:"will", email_address:"will@email.com", password:"123456" )

puts " #{User.count} users created"

#seeding shifts:
@morning = Shift.create!(user: @will, start: DateTime.new(2021, 4, 26, 8, 00, 00 ) , finish: DateTime.new(2021, 4, 26, 13, 30, 00), break_length: 20 )
@evening = Shift.create!(user: @will, start: DateTime.new(2021, 4, 27, 15, 30, 00), finish: DateTime.new(2021, 4, 27, 22, 00, 00), break_length: 20 )

puts " #{Shift.count} shifts created"

