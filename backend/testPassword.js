const bcrypt = require('bcryptjs');

async function testPassword() {
  const password = '12345678';
  
  console.log('Testing password:', password);
  
  // Hash the password
  const hash = await bcrypt.hash(password, 12);
  console.log('Generated hash:', hash);
  
  // Compare the password
  const isMatch = await bcrypt.compare(password, hash);
  console.log('Comparison result:', isMatch);
  
  // Test with wrong password
  const wrongMatch = await bcrypt.compare('wrongpass', hash);
  console.log('Wrong password result:', wrongMatch);
}

testPassword().catch(console.error);