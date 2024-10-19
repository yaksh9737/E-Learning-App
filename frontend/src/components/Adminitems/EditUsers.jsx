import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./edit.css";
import AdminNavTop from "../AdminNavTop";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchProduct, patchUser } from "../../Redux/AdminReducer/action";

const EditUser = () => {
  const backgroundImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-K0r9nPZU1CVVkRP6H-MB2LZEc0pFHmZLA&usqp=CAU";
  const { id } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.AdminReducer.users);
  const existedUser = store.filter((el) => el._id == id);
  const navigate = useNavigate();

  let obj = {
    name: existedUser[0].name,
    email: existedUser[0].email,
    password: existedUser[0].password,
    city: existedUser[0].city,
    age: existedUser[0].age,
  };
  const [detail, setDetail] = useState(obj);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    dispatch(patchUser(id, detail));
    alert("Data Updated Successfully");
    navigate("/admin/users");
  };

  return (
    <Grid className="Nav" h={"99vh"} w="94%" gap={10}>
      <Box mt="80px">
        <AdminNavTop />
        <Flex
          align="center"
          justify="center"
          position="relative" // for proper overlay handling
          border={"2px solid white"}
          borderRadius={10}
          className="background"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "300px",
          }}
        >
          {/* Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundColor="rgba(0, 0, 0, 0.7)" // Semi-transparent dark overlay
            zIndex="1"
          ></Box>

          {/* Form Content */}
          <Box
            width={["100%", "80%", "60%", "40%"]}
            p={4}
            zIndex="2"
            color={"white"}
            fontWeight={"bold"}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter Course Title"
                name="name"
                border={"1px solid"}
                value={detail.name}
                onChange={handleChange}
                bg="white"
                color="black"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Textarea
                type="email"
                border={"1px solid"}
                placeholder="Enter Email"
                name="email"
                value={detail.email}
                onChange={handleChange}
                bg="white"
                color="black"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter Password"
                name="password"
                border={"1px solid"}
                value={detail.password}
                onChange={handleChange}
                bg="white"
                color="black"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                placeholder="Enter City"
                name="city"
                border={"1px solid"}
                value={detail.city}
                onChange={handleChange}
                bg="white"
                color="black"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Age</FormLabel>
              <Input
                type="text"
                border={"1px solid"}
                name="age"
                value={detail.age}
                onChange={handleChange}
                bg="white"
                color="black"
              />
            </FormControl>
            <Button
              mt={4}
              colorScheme="blue"
              size="md"
              isFullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Flex>
      </Box>
    </Grid>
  );
};

export default EditUser;
