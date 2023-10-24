/**
 * @swagger
 * definitions:
 *   resetPasswordDef:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *         description: Enter email.
 *       newPassword:
 *         type: string
 *         required: true
 *         description: Enter newPassword.
 */
/** 
 * @swagger
/Users/resetpassword: 
*   put: 
*     description: Reset user password.
*     tags:
*     - User
*     summary: Reset user password.
*     parameters: 
*     - name: Model 
*       description: Reset password.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/resetPasswordDef'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Password reset successfully
*       400: 
*         description: Something went wrong
*       402: 
*         description: Invalid credentials
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/
