# `<Hooked />` - A Coding Study Buddy Website
`<Hooked />` was developed by Millena Lim, Morgan Oliver, and Zach Yau (A.K.A. Team ZZZ) as a capstone project for Dev10. `<Hooked />` is a study buddy website that promotes a strong and collaborative community among coders of all skill types. The main component of this app that sets it apart from others is its ability to match and message users who share the same language preference, proficiency level, and availability.

## Learning Goals
Our learning goals were to implement a messaging system using TalkJs, use advanced React components, and include visual packages to create a full stack web application.  

## Running Application 
Application created in Java and Javascript.
* uses Spring Boot, Spring Security, MySQL, JUnit and Mockito, REST, TalkJS, and React

### Login 
* There are two types of users that can login, a user or admin. 
* uses Spring Security and JSON Web Token

![login](https://user-images.githubusercontent.com/88859370/219983577-67f890ab-dea4-4246-a543-68c7b663fb8d.png)

### Sign Up
* uses Spring Security and JSON Web Token

![signup](https://user-images.githubusercontent.com/88859370/219983519-06dff5fc-ebbf-49f5-aad8-a29350be0369.png)

### Create Profile
* after creating a new account through the Sign Up page, user can create a new profile which will match them to other users with similar description
* displays a form created through React Hook Form

![create-profile](https://user-images.githubusercontent.com/88859370/219983551-06f9b9de-fa34-49a7-8452-81236fd59167.png)

### Home 
* displays the homepage 
* uses ParticlesBg and ReactTypical for web design

![homepage](https://user-images.githubusercontent.com/88859370/219983592-42422094-5853-45a9-ae21-a24320874acf.png)

### Profile Page
* displays the logged in user's profile and can edit their profile by clicking the `edit` button 

![profile-card](https://user-images.githubusercontent.com/88859370/219983608-cc8b1451-93a9-4277-8635-8c2d52f8e14d.png)

### Edit Profile 
* users can edit their information (this can change the matches displayed in the discover page)
* displays a form created through React Hook Form

![edit-profile](https://user-images.githubusercontent.com/88859370/219983629-7177d7c1-8c43-4379-9ac8-ab1b97567daf.png)

### Discover Page
* displays profile cards of other users that matches the current user based on programming language, proficiency level, and availability
* when user wants to message others, user can click the `Message` button and will prompt open a chat box at the bottom where the message icon is located

![discover](https://user-images.githubusercontent.com/88859370/219983699-9af00c4f-5940-4949-917b-192e48f9dce0.png)

### Messages Page
* displays a messaging box showing the user(s) that the current user is messaging
* uses TalkJs API to create a messaging system

![messages](https://user-images.githubusercontent.com/88859370/219983709-bff60c8b-56f0-405d-8d33-d50e293f2270.png)

### Users Page (ADMIN)
* only admins have access to this page
* displays a table of users on the application
* has the ability to edit or delete users

![admin](https://user-images.githubusercontent.com/88859370/219983902-359d6020-c743-4a8a-8b98-138642bde337.png)

### 404 Page
* page redirects users to homepage after five seconds if page could not be found

![Screenshot_20230219_071012](https://user-images.githubusercontent.com/88859370/219983940-6cf093c1-de7b-478d-ad81-b496bfcb7400.png)
