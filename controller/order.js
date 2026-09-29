import Order from "../model/order.js";
import Product from "../model/product.js";

const createOrderController = async (req, res) => {
  try {
    const {
      items,
      shippingInfo,
      paymentMethod,
    } = req.body;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !shippingInfo ||
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Complete order information is required",
      });
    }

    if (!["cod", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    const productIds = items.map((item) => item.productId);

    const validProductIds = productIds.every((id) =>
      /^[0-9a-fA-F]{24}$/.test(id)
    );

    if (!validProductIds) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== items.length) {
      return res.status(400).json({
        message: "One or more products are no longer available",
      });
    }

    let totalAmount = 0;

    const verifiedItems = items.map((item) => {
      const product = products.find(
        (product) =>
          product._id.toString() === item.productId
      );

      if (!product) {
        throw new Error("Product not found");
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Invalid product quantity");
      }

      const itemTotal = product.price * quantity;

      totalAmount += itemTotal;

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
        imageURL: product.imageURL,
      };
    });

    const newOrder = new Order({
      userId: req.user.userId,
      items: verifiedItems,
      shippingInfo: {
        fullName: shippingInfo.fullName.trim(),
        phone: shippingInfo.phone.trim(),
        address: shippingInfo.address.trim(),
        city: shippingInfo.city.trim(),
      },
      paymentMethod,
      totalAmount,
    });

    await newOrder.save();

    console.log("ORDER SAVED:", newOrder._id);

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Create Order Error:", error);

    res.status(500).json({
      message: "Error creating order",
    });
  }
};

const getMyOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log("Get Orders Error:", error);

    res.status(500).json({
      message: "Error fetching orders",
    });
  }
};

export {
  createOrderController,
  getMyOrdersController,
};