

 
  
  // 表单重置
 function resetForm(refName) {
    if (this.$refs[refName]) {
      this.$refs[refName].resetFields();
    }
  }
  
  export {
    resetForm,
 
}
