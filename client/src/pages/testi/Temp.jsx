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
    const [Diseased, setDisease] = useState("");
    const [hospitald, sethospital] = useState("");
    const [date, setdate] = useState("");
    const [description, setdescription] = useState("");
  
    let navigate = useNavigate();
  
    async function clicki() {
      console.log("clicked");
      const dat = {
        Disease: Diseased,
        hospital: hospitald,
        description: description,
        date: date.toString(),
      };
      console.log(dat);
      await axios.post("http://localhost:7000/store", dat).then((resp) => {
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
              <FormControl id="hospital" isRequired>
                <FormLabel>Disease Name</FormLabel>
                <Input
                  placeholder="Disease Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => {
                    console.log(e.target.value);
                    sethospital(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="Disease" isRequired>
                <FormLabel>Disease</FormLabel>
                <Input
                  placeholder="Disease"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => {
                    setDisease(e.target.value);
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
  