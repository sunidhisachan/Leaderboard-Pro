import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Avatar } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import ToggleButton from "@mui/material/ToggleButton";
import Button from '@mui/material/Button';
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    table_dark:{
        minWidth: 700,
        backgroundColor:"Black",
        border:"2px solid White",
        borderRadius:"10px",
    }
});
export const CodechefTable = ({ darkmode,
    codechefUsers,codecheffriends,setCodecheffriends,
    ccshowfriends,setCCshowfriends }) => {
        const [searchfield, setSearchfield] = useState("");
        const [filteredusers, setFilteredusers] = useState([]);
        const [todisplayusers, setTodisplayusers] = useState([]);
        const getccfriends= async ()=>{
          const response=await fetch("http://localhost:8000/api/getccfriends/",{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('authTokens')).access,
            },
        });
        
          const newData=await response.json();
          setCodecheffriends(newData);
          // setTodisplayusers(codeforcesUsers)
          // setFilteredusers(codeforcesUsers)
        }
      
        async function addfriend(e){
      
          setCodecheffriends(current => [...current, e]);
          const response=await fetch("http://localhost:8000/api/ccfriends/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('authTokens')).access,
            },
            body:JSON.stringify({
              'ccFriend_uname':e.username
          })
        });
          if(response.status!==200)
          {
            alert('ERROR!!!!')
          }
        }
        async function dropfriend(e){
          setCodecheffriends((current) =>
            current.filter((fruit) => fruit.username !== e)
          );
          const response=await fetch("http://localhost:8000/api/dropccfriends/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('authTokens')).access,
            },
            body:JSON.stringify({
              'ccFriend_uname':e
          })
        });
          if(response.status!==200)
          {
            alert('ERROR!!!!')
          }
        }
        useEffect(()=>{
          getccfriends();
          // eslint-disable-next-line
        },[])
      
        useEffect(()=>{
          if(ccshowfriends)
          {
            setTodisplayusers(codecheffriends);
          }
          else
          {
            setTodisplayusers(codechefUsers);
          }
          if (searchfield === "") {
            setFilteredusers(todisplayusers)
          } else {
            // eslint-disable-next-line
            setFilteredusers(
              todisplayusers.filter((cfUser) => {
                return cfUser.username
                  .toLowerCase()
                  .includes(searchfield.toLowerCase());
              })
            );
          }
          // eslint-disable-next-line
        },[ccshowfriends,codecheffriends,searchfield,codechefUsers])
      useEffect(()=>{
        if (searchfield === "") {
          setFilteredusers(todisplayusers)
        } else {
          // eslint-disable-next-line
          setFilteredusers(
            todisplayusers.filter((cfUser) => {
              return cfUser.username
                .toLowerCase()
                .includes(searchfield.toLowerCase());
            })
          );
        }
      },[searchfield,todisplayusers])
    const StyledTableCell = withStyles({
        root: {
          color: !darkmode?"Black":"White",
        }
      })(TableCell);
    const classes = useStyles();
    return (
<div className="codechef" style={{ display: "flex", justifyContent: "space-between",  marginTop: "2vh",width:"100vw",flexShrink:"0"}}>
            <div style={{marginRight:"18vw"}}>
                </div>            <div >
                <TableContainer component={Paper}>
                    <Table className={darkmode?classes.table_dark:classes.table} aria-label="codeforces-table">
                        <TableHead>
                            <TableRow style={{backgroundColor:darkmode?"#1F2F98":"#1CA7FC"}}>
                            <StyledTableCell>Avatar</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Rating</StyledTableCell>
                                <StyledTableCell>Max rating</StyledTableCell>
                                <StyledTableCell>Global Rank</StyledTableCell>
                                <StyledTableCell>Country Rank</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredusers.map(cfUser => (
                                <TableRow key={cfUser.id}>
                                    <StyledTableCell>
                                        <Avatar src={cfUser.avatar} alt={`${cfUser.username} avatar`} />
                                        {/* TODO: Lazy load the avatars ? */}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Link style={{fontWeight: "bold",textDecoration:"none",color:darkmode?"#03DAC6":""}} href={`https://codechef.com/users/${cfUser.username}`} target="_blank">
                                            {cfUser.username}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>{cfUser.rating}</StyledTableCell>
                                    <StyledTableCell>{cfUser.max_rating}</StyledTableCell>
                                    <StyledTableCell>{cfUser.Global_rank}</StyledTableCell>
                                    <StyledTableCell>{cfUser.Country_rank}</StyledTableCell>
                                    <StyledTableCell>
                  <Button variant="contained"
                  onClick={()=>{
                    !(codecheffriends.some(item=>item.username===cfUser.username))?
                    addfriend(cfUser):dropfriend(cfUser.username)
                  }
                  }
                  >
                    {
                      (codecheffriends.some(item=>item.username===cfUser.username))?
                      "Remove Friend":"Add Friend"
                    }

                  </Button>
                  </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{marginRight:"3vw",marginTop:"2vh",position:"relative"}}>   
            <TextField id="outlined-basic" label="Search Usernames" variant="outlined" 
            defaultValue=""
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>{setSearchfield(e.target.value)}}
    
            />
            <ToggleButton
          value="check"
          selected={ccshowfriends}
          onChange={() => {
            setCCshowfriends(!ccshowfriends)
          }}
          style={{
            backgroundColor: "#2196f3",
            color: "white",
            marginTop: "4vh",
          }}
        >
          {ccshowfriends?"Show All":"Show Friends"}
        </ToggleButton>
            </div>
        </div>
    )
}



