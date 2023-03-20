<template lang="">
  <div class="wrapper-content wrapper-content--fixed home">
    <section>
      <div class="container">

        <!-- table -->
        <table>
          <!-- thead -->
          <thead>
            <tr>
              <th @click="getSort('name')">Name</th>
              <th @click="getSort('age')">Age</th>
              <th @click="getSort('gender')">Gender</th>
            </tr>
          </thead>

          <!-- tbody -->
          <tbody>
            <tr v-for="user in usersSort" :key="user.id">
              <td class="td-head" style="cursor:pointer;">
                <img :src="user.img" :alt="user.name">
                <span>{{ user.name }}</span>
              </td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>

        </table>
        <p>debug: sort:{{currentSort}}, dir:{{currentSortDir}}</p>
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
      currentSort:'name',
      currentSortDir:'asc',
    };
  },
  created(){
     axios
     .get('http://localhost:3000/result')
     .then(response => {
      console.log(response.data[0]);
      this.users = response.data[0]
     })
     .catch(error => {
      console.log(error);
     })
  },
   computed:{
     usersSort () {
      return this.users.sort((a, b) => {
        let mod = 1
        if(this.currentSortDir === 'asc') mod = -1
        if(a[this.currentSort] < b[this.currentSort]) return -1 * mod
        if(a[this.currentSort] > b[this.currentSort]) return 1 * mod
        return 0
      })
     }
   },
  methods:{
    getSort(e) {
      if(e === this.currentSort){
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }

      this.currentSort = e
    }
  }
}
</script>
<style lang="css" scoped>
table {
  width: 100%;
  line-height: 1.5em;
  border-collapse: separate;
  border-spacing: 0 34px;
}

thead th{
  cursor: pointer;
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
