<script setup lang="ts">

defineOptions({
  name: "OneThreeDotsLoader",
});

</script>

<template>
  <span class="loader"></span>
</template>

<style>
.loader {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: block;
  margin: 0px auto;
  position: relative;
  background: #64748b;
  box-shadow: -12px 0 #64748b, 12px 0 #64748b;
  box-sizing: border-box;
  animation: shadowPulse 1.25s linear infinite;
}

@keyframes shadowPulse {
  22% {
    background: #64748b;
    box-shadow: -12px 0 #f1f5f9, 12px 0 #64748b;
  }

  45% {
    background: #f1f5f9;
    box-shadow: -12px 0 #64748b, 12px 0 #64748b;
  }

  70% {
    background: #64748b;
    box-shadow: -12px 0 #64748b, 12px 0 #f1f5f9;
  }
}</style>
