/** 
 * @swagger
/users/deletetodo/{id}: 
*   delete: 
*     description: delete ToDo.
*     tags:
*     - ToDo
*     summary: delete ToDo .
*     parameters: 
*     - name: id 
*       in: path 
*       description: Enter id.
*       required: true 
*       type: string
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
*       401: 
*         description: Failed to authenticate token
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/