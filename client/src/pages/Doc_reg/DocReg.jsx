import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Textarea,
} from "@chakra-ui/react";
import "./DovReg.css";
import { SmallCloseIcon } from "@chakra-ui/icons";
import WaveB from "../../components/WaveB/WaveB";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DocForm() {
  const [usernamed, setusername] = useState("");
  // const [emaild, setemail] = useState("");
  // const [passwordd, setpassword] = useState("");
  const [Specializationd, setspecialization] = useState("");
  // const [rating, setrating] = useState("");
  const [date, setdate] = useState("");
  const [description, setdescription] = useState("");
  // const [check, setcheck] = useState(false);

  let navigate = useNavigate();

  async function clicki() {
    console.log("clicked");
    const dat = {
      username: usernamed,
      // password: passwordd,
      // email: emaild,
      specialization: Specializationd,
      description: description,
      date: date.toString(),
      // rating: rating,
    };
    await axios.post("http://localhost:7000/docreg", dat).then((resp) => {
      if (!resp.data) {
        alert("User name already exists");
      } else {
        console.log("Done");
        navigate("/presc");
      }
    });
  }
  return (
    <Box width={"100%"} height={"100%"} n>
      <Box classname="cardi">
        <Flex
          className="docreg"
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            className="card1 scrollable-div"
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              ADD prescription
            </Heading>
            <FormControl id="Specialization" isRequired>
              <FormLabel>Hospital Name</FormLabel>
              <Input
                placeholder="Hospital Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => {
                  console.log(e.target.value);
                  setspecialization(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Disease</FormLabel>
              <Input
                placeholder="Disease"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
            </FormControl>
            
            
            
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                _placeholder={{ color: "gray.500" }}
                type="text"
                className="des1"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>date</FormLabel>
              <Input
                placeholder="DD/MM/YYYY"
                _placeholder={{ color: "gray.500" }}
                type="date"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setdate(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={clicki}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}

export default DocForm;
