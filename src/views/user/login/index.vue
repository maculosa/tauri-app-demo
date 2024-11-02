<template>
    <img :src="captcha" alt="captch img" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { request } from "@/utils";

const captcha = ref<string>('')

const getCaptcha = async () => {
    try {
    const res = await request({
      url: "/api/login/captcha",
      method: "GET",
    });

    captcha.value = res.data.captchaUrl;
    console.log("res: ", res.data);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getCaptcha();
});

</script>
