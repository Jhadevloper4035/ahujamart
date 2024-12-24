import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove }) => {
  const { name, shortDescription, images, slug } = product;
  const { Meta } = Card;

  return (
    <Card
      cover={
        <img
          alt={name}
          src={images[0].url}
          style={{ width: 300, height: 250 }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined key="edit" />
        </Link>,
        <DeleteOutlined
          key="ellipsis"
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta title={name} description={shortDescription} />
    </Card>
  );
};

export default AdminProductCard;
