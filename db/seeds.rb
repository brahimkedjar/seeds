# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


Doctor.create!(
  id: 18,
  email: "hichamyahiaoui@gmail.com",
  encrypted_password: "$2a$12$g6rPPaZpsrN6gb/cQGlS7OrUfkjvS2b0gWsZM5Qfbxm5KWu.Qdhhu",
  name: "Hicham Yahiaoui",
  phone_number: "0556452541",
  address: "Rue 20 Aqut 1955",
  specialite: "Cardiologue",
  selected_wilaya: ["Sétif", "Aïn Azel", "Tissemsilt"],
  latitude: 36.7296512,
  longitude: 3.0867456,
  reset_password_token: nil,
  reset_password_sent_at: nil,
  remember_created_at: nil,
  confirmation_token: "42y4xUKcxoPEF-WMysD2",
  confirmed_at: "2023-05-09 17:51:22.338091",
  confirmation_sent_at: "2023-05-09 17:51:22.338091",
  unconfirmed_email: nil,
  sign_in_count: 0,
  current_sign_in_at: nil,
  last_sign_in_at: nil,
  current_sign_in_ip: nil,
  last_sign_in_ip: nil,
  created_at: "2023-05-09 17:51:22.337892",
  updated_at: "2023-05-09 17:51:22.337892",
  numero_clinique: 123456,
  experience: 10
)

Doctor.create!(
  id: 19,
  email: "boussadiamanal@gmail.com",
  encrypted_password: "$2a$12$F3/kga0Oe1702QKT1ZaRL.5bmZ6YMhLnhz4Srf/a4iiL/v6PqAEv2",
  name: "bousadia manal",
  phone_number: "0552146327",
  address: "Rte de Saoula",
  specialite: "Dentiste",
  selected_wilaya: ["Alger", "Oran"],
  latitude: 36.681450,
  longitude: 3.218704,
  reset_password_token: nil,
  reset_password_sent_at: nil,
  remember_created_at: nil,
  confirmation_token: "6nBfQiVBxZw59C2Bay2M",
  confirmed_at: "2023-05-09 17:55:29.939662",
  confirmation_sent_at: "2023-05-09 17:55:29.939662",
  unconfirmed_email: nil,
  sign_in_count: 0,
  current_sign_in_at: nil,
  last_sign_in_at: nil,
  current_sign_in_ip: nil,
  last_sign_in_ip: nil,
  created_at: "2023-05-09 17:55:29.936538",
  updated_at: "2023-05-09 17:55:29.936538",
  numero_clinique: 123456,
  experience: 5
)


###################################################################################################################



  Patient.create!(
    id: 15,
    name: "Amani Ghamoud",
    email: "amanighamoud@gmail.com",
    phone_number: "0551427474",
    baladia: "Alger",
    encrypted_password: "$2a$12$wFS5MZocpuu.IrpubXunM.02SwNtjbcceG0M.tgx.vTClCDmD1doq",
    reset_password_token: nil,
    reset_password_sent_at: nil,
    latitude: 36.712488,
    longitude: 3.057606,
    remember_created_at: nil,
    sign_in_count: 0,
    current_sign_in_at: nil,
    last_sign_in_at: nil,
    current_sign_in_ip: nil,
    last_sign_in_ip: nil,
    confirmation_token: "M5mT7DkGYLSjK9pFzb19",
    confirmed_at: "2023-05-09 18:03:00.070034",
    confirmation_sent_at: "2023-05-09 18:03:00.070034",
    unconfirmed_email: nil,
    failed_attempts: 0,
    unlock_token: nil,
    locked_at: nil,
    group_id: [1],
    onesignal_player_id: {}
  )
  Patient.create!(
    id: 14,
    name: "Brahim Kedjar",
    email: "brahimkedjar@gmail.com",
    phone_number: "0559857456",
    baladia: "Sétif",
    encrypted_password: "$2a$12$cO7HyGXCK4FFnj1M6qXbwOoAlo3TotTQeLRO8knXy3zeXuXFI7cRq",
    reset_password_token: nil,
    reset_password_sent_at: nil,
    latitude: 36.190596,
    longitude: 5.406434,
    remember_created_at: nil,
    sign_in_count: 0,
    current_sign_in_at: nil,
    last_sign_in_at: nil,
    current_sign_in_ip: nil,
    last_sign_in_ip: nil,
    confirmation_token: "6XyWoWHbfvwY7yZmSKgD",
    confirmed_at: "2023-05-09 18:02:05.75718",
    confirmation_sent_at: "2023-05-09 18:02:05.75718",
    unconfirmed_email: nil,
    failed_attempts: 0,
    unlock_token: nil,
    locked_at: nil,
    group_id: nil,
    onesignal_player_id: {}
  )

  Patient.create!(
    id: 16,
    name: "Kaouter Okba",
    email: "kaoutherokba@gmail.com",
    phone_number: "0556858575",
    baladia: "Oran",
    encrypted_password: "$2a$12$prUGQqEuK7V2RcSJDD52pezF6MmYyz0Dit8rd.Ptw1scQz.is3Ify",
    reset_password_token: nil,
    reset_password_sent_at: nil,
    latitude: 35.685995,
    longitude: -0.678708,
    remember_created_at: nil,
    sign_in_count: 0,
    current_sign_in_at: nil,
    last_sign_in_at: nil,
    current_sign_in_ip: nil,
    last_sign_in_ip: nil,
    confirmation_token: "9m-493UAYr44LkASxKVK",
    confirmed_at: "2023-05-09 18:03:47.746238",
    confirmation_sent_at: "2023-05-09 18:03:47.746238",
    unconfirmed_email: nil,
    failed_attempts: 0,
    unlock_token: nil,
    locked_at: nil,
    group_id: nil,
    onesignal_player_id: {}
  )

  Patient.create!(
    id: 17,
    name: "Aymen Mayouf",
    email: "aymenmayouf@gmail.com",
    phone_number: "0554986057",
    baladia: "Alger",
    encrypted_password: "$2a$12$pAyRfiyDpXXT2lCtWE.XqeSM8dGR8DPHzlXT0XaaFZXjMfdMO7bSi",
    reset_password_token: nil,
    reset_password_sent_at: nil,
    latitude: 36.723496,
    longitude: 3.135883,
    remember_created_at: nil,
    sign_in_count: 0,
    current_sign_in_at: nil,
    last_sign_in_at: nil,
    current_sign_in_ip: nil,
    last_sign_in_ip: nil,
    confirmation_token: "QmQ3xjZ3PK-LGXq8hKXM",
    confirmed_at: "2023-05-09 18:04:31.13492",
    confirmation_sent_at: "2023-05-09 18:04:31.13492",
    unconfirmed_email: nil,
    failed_attempts: 0,
    unlock_token: nil,
    locked_at: nil,
    group_id: nil,
    onesignal_player_id: {}
  )

  Patient.create!(
      id: 18,
      name: "Wahid Slimani",
      email: "wahidslimani@gmail.com",
      phone_number: "0559361799",
      baladia: "Alger",
      encrypted_password: "$2a$12$1ABTalF7FA8g6BpFQsVURelqZscCjR6JQI.GbqWLVJcDnmZU7dpKm",
      reset_password_token: nil,
      reset_password_sent_at: nil,
      latitude: 36.69668,
      longitude: 3.092717,
      remember_created_at: nil,
      sign_in_count: 0,
      current_sign_in_at: nil,
      last_sign_in_at: nil,
      current_sign_in_ip: nil,
      last_sign_in_ip: nil,
      confirmation_token: "RAVcGbP7doGjyjQcUo9x",
      confirmed_at: "2023-05-10 00:28:37.302559",
      confirmation_sent_at: "2023-05-10 00:28:37.302559",
      unconfirmed_email: nil,
      failed_attempts: 0,
      unlock_token: nil,
      locked_at: nil,
      group_id: [2],
      onesignal_player_id: nil
  )


  ########################################################################################################################






  User.create!(
    id: 29,
    email: "hichamyahiaoui@gmail.com",
    encrypted_password: "$2a$12$jVl1c5O5QfdItK1ejtK3xeMsIjQgQqGMFdCHxXD6G0Ep3hQy.BEpu",
    role: 1, # 1 is doctor
    remember_created_at: nil,
    invitation_token: nil,
    invitation_created_at: nil,
    invitation_sent_at: nil,
    invitation_accepted_at: nil,
    invitation_limit: nil,
    invited_by_type: nil,
    invited_by_id: nil,
    invitations_count: 0,
    baladia: "Sétif",
    phone_number: "0556452541",
    doctor_id: 18,
    patient_id: nil,
  )


User.create!(
  id: 30,
  email: "boussadiamanal@gmail.com",
  encrypted_password: "$2a$12$RhbmbCeRdS3Sd2DEC.BmCegDPHi2btlTR8W1IDCbINdYzXVkqc9Su",
  role: 1, # 1 is doctor
  remember_created_at: nil,
  invitation_token: nil,
  invitation_created_at: nil,
  invitation_sent_at: nil,
  invitation_accepted_at: nil,
  invitation_limit: nil,
  invited_by_type: nil,
  invited_by_id: nil,
  invitations_count: 0,
  baladia: "Oran",
  phone_number: "0552146327",
  doctor_id: 19,
  patient_id: nil,
)

User.create!(
  id: 31,
  email: "brahimkedjar@gmail.com",
  encrypted_password: "$2a$12$SUQZhbrDYEW86xMXQyJ3i.HnF/Ulx090Awts0Pof4I3Acoi7U1.my",
  role: 0, # 0 is patient
  remember_created_at: nil,
  invitation_token: nil,
  invitation_created_at: nil,
  invitation_sent_at: nil,
  invitation_accepted_at: nil,
  invitation_limit: nil,
  invited_by_type: nil,
  invited_by_id: nil,
  invitations_count: 0,
  baladia: "Alger",
  phone_number: "05526452541",
  doctor_id: nil,
  patient_id: 14,
)

User.create!(
  id: 32,
  email: "amanighamoud@gmail.com",
  encrypted_password: "$2a$12$nRwceUkxVLq5rSfs504f3eOAeXCH4Icvkx8AbgPCy/Tf6e81OCGGC",
  role: 0, # 0 is patient
  remember_created_at: nil,
  invitation_token: nil,
  invitation_created_at: nil,
  invitation_sent_at: nil,
  invitation_accepted_at: nil,
  invitation_limit: nil,
  invited_by_type: nil,
  invited_by_id: nil,
  invitations_count: 0,
  baladia: "Alger",
  phone_number: "05526452542",
  doctor_id: nil,
  patient_id: 15,
)

User.create!(
  id: 33,
  email: "kaoutherokba@gmail.com",
  encrypted_password: "$2a$12$.kCatjnqnoKVCPp7n/imsuuHgU15F07PlvZwNkdrSE8t/zROoM2KC",
  role: 0, # 0 is patient
  remember_created_at: nil,
  invitation_token: nil,
  invitation_created_at: nil,
  invitation_sent_at: nil,
  invitation_accepted_at: nil,
  invitation_limit: nil,
  invited_by_type: nil,
  invited_by_id: nil,
  invitations_count: 0,
  baladia: "Alger",
  phone_number: "05526452543",
  doctor_id: nil,
  patient_id: 16,
)


User.create!(
  id: 34,
  email: "aymenmayouf@gmail.com",
  encrypted_password: "$2a$12$E8Quz/oMEkwpMmYWMvO7J.ep4OMLCtpWZ/MzNLfez621njcetGSHu",
  role: 0, # 0 is patient
  remember_created_at: nil,
  invitation_token: nil,
  invitation_created_at: nil,
  invitation_sent_at: nil,
  invitation_accepted_at: nil,
  invitation_limit: nil,
  invited_by_type: nil,
  invited_by_id: nil,
  invitations_count: 0,
  baladia: "Alger",
  phone_number: "05526452544",
  doctor_id: nil,
  patient_id: 17,
)

####################################################################################################################


Notification.create!(
  group_id: 1,
  message: "Vous avez un rendez-vous avec Dr. Hicham Yahiaoui, le Fri May 12 2023",
  sent_at: Time.now,
  created_at: Time.now,
  updated_at: Time.now,
  doctor_name: "Hicham Yahiaoui",
  doctor_speciality: "Cardiologue",
  appointment_date: "Fri May 12 2023",
  place: "",
  doctor_id: 18,
  doctor_image_url: ""
)

Notification.create!(
  group_id: 2,
  message: "Vous avez un rendez-vous avec Dr. Hicham Yahiaoui, le Sun May 14 2023",
  sent_at: Time.now,
  created_at: Time.now,
  updated_at: Time.now,
  doctor_name: "Hicham Yahiaoui",
  doctor_speciality: "Cardiologue",
  appointment_date: "Sun May 14 2023",
  place: "",
  doctor_id: 18,
  doctor_image_url: ""
)

###################################################################################################################


Group.create!(
  id:95,
  group_id: 1,
  latitude: 36.712488,
  longitude: 4.057606,
  speciality: "Cardiologue",
  baladia: "Aïn Azel",
  doctor_id: nil,
  patient_id: 15,
  created_at: Time.now,
  updated_at: Time.now
)

# Create another group
Group.create!(
  id:98,
  group_id: 2,
  latitude: 36.69668,
  longitude: 3.092717,
  speciality: "Cardiologue",
  baladia: "Sétif",
  doctor_id: nil,
  patient_id: 18,
  created_at: Time.now,
  updated_at: Time.now
)

Group.create!(
  id:104,
  group_id: 2,
  latitude: 36.723496,
  longitude: 3.135883,
  speciality: "Cardiologue",
  baladia: "Sétif",
  doctor_id: nil,
  patient_id: 17,
  created_at: Time.now,
  updated_at: Time.now
)



##################################################################################################################


GroupsNumber.create!(
  id:60,
  group_id: 1,
  patients_number: 1,
  created_at: Time.now,
  updated_at: Time.now
)

# Create another group_number
GroupsNumber.create!(
  id:63,
  group_id: 2,
  patients_number: 1,
  created_at: Time.now,
  updated_at: Time.now
)
