import { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProfileForm({ messages, setMessages, currentUser, makeId, parseResponseMessage}) {

  const { userId } = useParams();

  const auth = useContext(AuthContext);

  const selectScheduleOptions = [
    { value: "1", label: "Monday - Morning" },
    { value: "2", label: "Monday - Afternoon" },
    { value: "3", label: "Monday - Evening" },
    { value: "4", label: "Tuesday - Morning" },
    { value: "5", label: "Tuesday - Afternoon" },
    { value: "6", label: "Tuesday - Evening" },
    { value: "7", label: "Wednesday - Morning" },
    { value: "8", label: "Wednesday - Afternoon" },
    { value: "9", label: "Wednesday - Evening" },
    { value: "10", label: "Thursday - Morning" },
    { value: "11", label: "Thursday - Afternoon" },
    { value: "12", label: "Thursday - Evening" },
    { value: "13", label: "Friday - Morning" },
    { value: "14", label: "Friday - Afternoon" },
    { value: "15", label: "Friday - Evening" },
    { value: "16", label: "Saturday - Morning" },
    { value: "17", label: "Saturday - Afternoon" },
    { value: "18", label: "Saturday - Evening" },
    { value: "19", label: "Sunday - Morning" },
    { value: "20", label: "Sunday - Afternoon" },
    { value: "21", label: "Sunday - Evening" },
  ];

  const registerOptions = {
    schedule: { required: "Availability times required." },
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
      reset({
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
        language: '',
        proficiency: '',
        schedule: '',
        bio: '',
      });
    }, [window.location.pathname]);

  useEffect(() => {
    if (userId) {
      fetch("http://localhost:8080/user/" + userId, {
        headers: {
          Authorization: "Bearer " + auth.currentUser.token,
        },
      })
        .then((response) => parseResponseMessage(response))
        .then((user) => {
          setValue("userId", user.userId);
          setValue("username", user.username);
          setValue("firstName", user.firstName);
          setValue("lastName", user.lastName);
          setValue("language", user.language);
          setValue("proficiency", user.proficiencyLevel);
          setValue("schedule", user.schedule.length > 1 ? user[1] : "");
          setValue("bio", user.bio);
        })
        .catch((error) => {
          if (error.message === "Unexpected end of JSON input") {
            navigate("/404");
          } else {
          setMessages([...messages, { id: makeId(), type: "failure", text: error.message }])
          }
    });
    }
  }, []);

  const onSubmit = (userData) => {
    let revisedUserData = { ...userData, schedule: [] };

    if (userId) {
      revisedUserData["userId"] = userId;

      fetch("http://localhost:8080/user" + currentUser.userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.currentUser.token,
        },
        body: JSON.stringify(revisedUserData),
      })
        .then((response) =>
          parseResponseMessage(response, revisedUserData, "edited")
        )
        .then(() => navigate("/profile"))
        .catch((error) =>
          setMessages([...messages, { id: makeId(), type: "failure", text: error.message }])
        );
    } else {
      console.log("Token: ", auth.currentUser);
      console.log("User Data: ", revisedUserData);
      fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.currentUser.token,
        },
        body: JSON.stringify(revisedUserData),
      })
        .then((response) => parseResponseMessage(response))
        .then((userData) => setMessages([...messages,{ id: makeId(), type: "success", text: `User ${userData.firstName} ${userData.lastName} successfully created profile.`}]))
        .then(() => navigate("/profile"))
        .catch((error) =>
          setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]));
    };
  };

  // newUserObj.schedule && retypedUser.schedule.push(newUserObj.schedule);

return (
  <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
    <label className="form-label mt-3" htmlFor="profile-firstName">
      First Name
    </label>
    <input
      className="form-control"
      type="text"
      id="profile-firstName"
      {...register("firstName", { required: "First Name is required." })}
    />
    <p className="form-error-message">{errors.firstName?.message}</p>

    <label className="form-label mt-3" htmlFor="profile-lastName">
      Last Name
    </label>
    <input
      className="form-control"
      type="text"
      id="profile-lastName"
      {...register("lastName", { required: "Last Name is required." })}
    />
    <p className="form-error-message">{errors.lastName?.message}</p>

    <label className="form-label mt-3" htmlFor="profile-language">
      Language
    </label>
    <select
      className="form-select"
      type="text"
      id="profile-language"
      {...register("language", { required: "Language is required." })}
    >
      <option value="" selected disabled>
        Programming Language
      </option>
      <option value="Java">Java</option>
      <option value="C">C</option>
      <option value="C#">C#</option>
      <option value="C++">C++</option>
      <option value="JavaScript">Javascript</option>
      <option value="Python">Python</option>
      <option value="PHP">PHP</option>
      <option value="SQL">SQL</option>
    </select>
    <p className="form-error-message">{errors.language?.message}</p>

    <label className="form-label mt-3" htmlFor="profile-proficiency">
      Proficiency Level
    </label>
    <select
      className="form-select"
      type="text"
      id="profile-proficiency"
      {...register("proficiency", {
        required: "Proficiency level is required.",
      })}
    >
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
      <option value="Expert">Expert</option>
    </select>
    <p className="form-error-message">{errors.proficiency?.message}</p>

    <label className="form-label mt-3" htmlFor="profile-schedule">
      Availability
    </label>
    <Controller
      className="schedule"
      control={control}
      defaultValue=""
      rules={registerOptions.schedule}
      render={() => (
        <Select
          options={selectScheduleOptions}
          {...register("schedule")}
          label="Text field"
        />
      )}
    />
    {/* <select
        className="form-select"
        type="text"
        id="profile-schedule"
        {...register("schedule", {required: "Schedule is required."})}
      > */}
    {/* <option value="1">Monday - Morning</option>
        <option value="2">Monday - Afternoon</option>
        <option value="3">Monday - Evening</option>
        <option value="4">Tuesday - Morning</option>
        <option value="5">Tuesday - Afternoon</option>
        <option value="6">Tuesday - Evening</option>
        <option value="7">Wednesday - Morning</option>
        <option value="8">Wednesday - Afternoon</option>
        <option value="9">Wednesday - Evening</option>
        <option value="10">Thursday - Morning</option>
        <option value="11">Thursday - Afternoon</option>
        <option value="12">Thursday - Evening</option>
        <option value="13">Friday - Morning</option>
        <option value="14">Friday - Afternoon</option>
        <option value="15">Friday - Evening</option>
        <option value="16">Saturday - Morning</option>
        <option value="17">Saturday - Afternoon</option>
        <option value="18">Saturday - Evening</option>
        <option value="19">Sunday - Morning</option>
        <option value="20">Sunday - Afternoon</option>
        <option value="21">Sunday - Evening</option> */}
    {/* </select> */}
    <p className="form-error-message">{errors.schedule?.message}</p>

    <label className="form-label mt-3" htmlFor="profile-bio">
      Bio
    </label>
    <input
      className="form-control"
      type="text"
      id="profile-bio"
      {...register("bio")}
    />
    <p className="form-error-message">{errors.bio?.message}</p>

    <button className="btn btn-primary mt-3" type="submit">
      {currentUser.userId > 0 ? "Edit" : "Create Profile"}
    </button>
  </form>
);
}

export default ProfileForm;
