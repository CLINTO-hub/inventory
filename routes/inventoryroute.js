import express from 'express'
import { addBulkInventory, addInventory, generateReports, listInventory, stockCheckIn, stockCheckOut, updateInventory } from '../controllers/inventorycontroller.js'

const router = express.Router()

router.post("/addinventory", addInventory)
router.post("/addbulkinventory", addBulkInventory)
router.get("/list", listInventory)
router.put("/update/:id", updateInventory)
router.put("/stock-in/:id", stockCheckIn)
router.put("/stock-out/:id", stockCheckOut)
router.get("/report", generateReports)

export default router