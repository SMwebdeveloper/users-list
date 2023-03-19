<template lang="">
  <div class="wrapper-content wrapper-content--fixed home">
    <section>
      <div class="container">

        <!-- table -->
        <table>
          <!-- thead -->
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>

          <!-- tbody -->
          <tbody>
            <tr v-for="user in users[0]" :key="user.id">
              <td class="td-head">
                <img :src="user.img" :alt="user.name">
                <span>{{ user.name }}</span>
              </td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>

        </table>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: [],
    };
  },
  created(){
     axios
     .get('http://localhost:3000/result')
     .then(response => {
      this.users = response.data
      console.log(this.users);
     })
     .catch(error => {
      console.log(error);
     })
  }
};
</script>
<style lang="css" scoped>
table {
  width: 100%;
  line-height: 1.5em;
  border-collapse: separate;
  border-spacing: 0 34px;
}

table th {
  padding: 20px 22px;
  white-space: nowrap;
  font-size: 22px;
}

table td {
  padding: 20px;

}
.td-head{
  display: flex;
  align-items: center;
  justify-content: center;
}
td img{
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}

table tbody tr {
  background: #f5f5f5;
  font-weight: 600;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}

table tbody tr:hover {
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
  transform: translate(0, -6px);
  transition-delay: 0s !important;
}
</style>
