import express from 'express'
import { addMenu, editMenu,deleteMenu, searchMenu,  addToCart } from '../controller/menu.controller.ts';
import { isAuthenticated } from '../middlewares/isAuthenticated.ts';
import upload from '../middlewares/multer.ts';

const router = express.Router();

router.route('/create').post(isAuthenticated,upload.single('image'),addMenu);
router.route('/update').put(isAuthenticated,upload.single('image'),editMenu);
router.route("/delete/:id").delete(isAuthenticated,deleteMenu);
router.route("/search").get(searchMenu);
router.route("/add-to-cart").post(isAuthenticated,addToCart);
export default router