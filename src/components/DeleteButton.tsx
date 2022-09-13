import { Alert, Button, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export function DeleteButton(props: any) {
  async function handleDelete(): Promise<void> {
    try {
      await axios.delete(`${import.meta.env.VITE_DB_URL}/${props.user.key}`)
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Popconfirm 
      title={props.title}
      onConfirm={handleDelete}
    >
      <Button danger type="primary">
        Delete
      </Button>
    </Popconfirm>
  );
}

