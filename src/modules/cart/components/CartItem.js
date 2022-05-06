// Author: Namit Prakash Dadlani (B00873214)

import { IconButton, ListItem, ListItemText, Typography, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import api from "common/api";
import { AppContext } from "AppContext";

function CartItem({ value, handleDeletion }) {
    const { state } = useContext(AppContext);
    const [propertyString, setPropertyString] = useState("");
    

    useEffect(() => {
        async function getPropertyDetails() {
            const res = await api.get(`/cart/getPropertyName/${value.property}`, {
                headers: {
                    Authorization: `Bearer ${state.authToken}`
                },
            });
            if(res.data !== ""){
                let tempString = "Booking for property: "+res.data.propertyTitle
                setPropertyString(tempString);
            } else {
                let tempString = "Booking for property ID: "+value.property
                setPropertyString(tempString);
            }
        }
        getPropertyDetails()
    }, []);


    return (
        <div>
            <ListItem alignItems="flex-start" sx={{ divider: true }} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeletion(value._id)}>
                    <DeleteIcon />
                </IconButton>
            } >
                <ListItemText
                    primary={<strong>{propertyString}</strong>}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                From: {moment(new Date(value.fromDate)).format("DD/MM/YYYY")}
                                <br></br>To: {moment(new Date(value.toDate)).format("DD/MM/YYYY")}
                                <br></br>Occupants: {value.noOfOccupants}
                                <br></br>Rent: {value.calculatedRent}
                            </Typography>
                        </>
                    }
                />
            </ListItem>
        </div>
    );
}
export default CartItem;
