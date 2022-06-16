import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import "./ProductManagementStyle.css"
import UploadImage from "./UploadImage";


// type product = {
//     id: number;
//     nameProduct: string;
//     model: string;
//     image: string;
//     price: number;
//     describes: string;
//     color: string;
// };

type props = {
    reload: () => void
};
type Size = {
    id: Number
    size: String
}
// type reload : () =>  void

export default ({ reload }: props) => {
    const [NameProduct, setNameProduct] = useState("")
    const [Model, setModel] = useState("")
    const [Image, setImage] = useState([])
    const [Price, setPrice] = useState(0)
    const [Describes, setDescribes] = useState("")
    const [Color, setColor] = useState("")
    console.log(Image);


    const addProduct = () => {
        axios({
            method: "post",
            url: "http://localhost:9191/addProduct",
            data: {
                "nameProduct": NameProduct,
                "model": Model,
                "image": Image[0],
                "price": Price,
                "describes": Describes,
                "color": Color
            },
        })
            .then((res) => {
                reload();
                alert("San pham vua them co id: " + res.data.id)
                setIdP(res.data.id)
                setModalSize(true)
            })
            .catch((err) => { console.log(err); });
    };

    const resetAll = () => {
        setNameProduct("")
        setModel("")
        setImage([])
        setPrice(0)
        setDescribes("")
        setColor("")
        setModalSize(false)
        setQuantity(0)
    }

    //-========================================
    const [modalSize, setModalSize] = useState(false)
    const [sizes, setSizes] = useState<Size[]>([]);
    const [selectSize, setSelectSize] = useState(1);
    const [idP, setIdP] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        getAPI("http://localhost:9191/sizes");
    }, []);
    const getAPI = (url: string) => {
        axios({
            method: "get",
            url: url,
            data: null,
        })
            .then((res) => {
                setSizes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const addProductSize = () => {
        axios({
            method: "post",
            url: "http://localhost:9191/addProductSize",
            data: {
                "product_id": idP,
                "size_id": selectSize,
                "quantity": quantity,
            }
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        resetAll();
        alert("Them thanh cong")
    }

    const checkSize = (data: Number) => {
        if (selectSize == data)
            return "red"
        else return "white"
    }


    return (
        <tr>
            <td>
                <input
                    className="input"
                    type="text"
                    placeholder={NameProduct}
                    onChange={(e) => setNameProduct(e.target.value)}
                >
                </input>
            </td>

            <td>
                <input
                    className="input"
                    type="text"
                    placeholder={Model}
                    onChange={(e) => setModel(e.target.value)}
                ></input>
            </td>
            <td>
                <input
                    className="input"
                    type="text"
                    placeholder={Price + ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                ></input>
            </td>
            <td>
                <input
                    className="input"
                    type="text"
                    placeholder={Describes}
                    onChange={(e) => setDescribes(e.target.value)}
                ></input>
            </td>
            <td>
                <input
                    className="input"
                    type="text"
                    placeholder={Color}
                    onChange={(e) => setColor(e.target.value)}
                ></input>
            </td>
            
            <td>
            <UploadImage setUploadImage={setImage} />
            </td>
            <td>
            {/* modal */}
            {
                modalSize ?
                    <>
                        <input style={{marginBottom: "10px"}}
                            className="input"
                            type="number"
                            placeholder="Quantity"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        {
                            sizes.map((size) => (
                                <button className='bttn'
                                    style={{ backgroundColor: checkSize(size.id), margin: "5px" }}
                                    onClick={() => setSelectSize(Number(size.id))}
                                >{size.size + ""}</button>
                            ))
                        }
                        <button className='bttn' style={{width: "100%", marginTop: "10px", backgroundColor: "#ffc107"}} onClick={() => addProductSize()}>Hoàn Thành</button>
                    </>
                    :
                    <></>
            }
            </td>
            <td>
                <button className='bttn' style={{backgroundColor: "#ffc107"}} onClick={() => {
                    addProduct()
                }}
                >Thêm</button>
            </td>
        </tr>
    )
}
