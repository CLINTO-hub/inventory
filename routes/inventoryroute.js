import express from 'express'
import { addBulkInventory, addInventory, generateReports, listInventory, stockCheckIn, stockCheckOut, updateInventory } from '../controllers/inventorycontroller.js'
import { authenticateToken } from '../middileware/authmiddileware.js'

const router = express.Router()

router.post("/addinventory",authenticateToken,addInventory)
router.post("/addbulkinventory",authenticateToken, addBulkInventory)
router.get("/list", listInventory)
router.put("/update/:id",authenticateToken,updateInventory)
router.put("/stock-in/:id",authenticateToken, stockCheckIn)
router.put("/stock-out/:id",authenticateToken,stockCheckOut)
router.get("/report",authenticateToken,generateReports)

export default router